//////////////////////////////////////////////////////////////////
/////////////////    BEGINNING functional library for load-menu
/////////////////////////////////////////////////////////////////

const loadLibrary = (function() {
  return {
    makeImage: function() {
      const cardImage = document.createElement('img');
      return cardImage;
    },

    makeDarkOverlay: function() {
      const overlay = document.createElement('div');
      overlay.className = 'load-menu card-overlay';
      return overlay;
    },

    makePlusOverlay: function() {
      const overlay = document.createElement('div');
      overlay.className = 'load-menu new-card-plus';
      overlay.innerText = '+'
      return overlay;
    },

    makeCard: function(configObj) {
      const menuCard = document.createElement('div');
      menuCard.className = 'load-menu menu-card';
      menuCard.append(document.createElement('div'), document.createElement('div'));
      menuCard.firstChild.className = 'load-menu menu-card-content img-container';
      menuCard.lastChild.className = 'load-menu menu-card-content desc-container';
      menuCard.firstChild.appendChild(loadLibrary.makeImage());
      menuCard.firstChild.appendChild(loadLibrary.makeDarkOverlay());

      for (const string of configObj.paragraphText) {
        menuCard.lastChild.appendChild(document.createElement('p'));
        menuCard.lastChild.firstChild.innerText = string;
      }

      return menuCard;
    }
  }
})();



//////////////////////////////////////////////////////////////////
////////////////////        Helpful Utilities
/////////////////////////////////////////////////////////////////

const inActiveLoadMenuType = function() {
  return (activeLoadMenuType==='character' ? 'journey' : 'character');
}

const capitalized = function() {
  return this[0].toUpperCase() + this.slice(1);
}



//////////////////////////////////////////////////////////////////
/////////////////    load classes
/////////////////////////////////////////////////////////////////

class LoadMenuItems {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.points = obj.points;

    const configObj = {
      paragraphText: [`Name: ${this.name}`]
    };
    this.node = loadLibrary.makeCard(configObj);
  }

  static sortUpdatedAt(a,b) {
    return new Date(b.updated_at) - new Date(a.updated_at);
  }

  static pushPoints(pointsCollection) {
    for (const point of pointsCollection) {
      const pointName = point.querent_ref.split(", ")[0];
      const pointCards = point.querent_ref.split(", ").slice(1);
      for (const card of pointCards) {
        this[pointName].cards.push({
          id: card.split(" ")[0],
          state: card.split(" ")[1]
        })
      }
      this[pointName].description = point.description;
    }
  }

  static loadToPointState(callback) {
    pointStateInitialize();
    const resourceId = event.target.parentNode.parentNode.classList[3];
    const loadResource = (activeLoadMenuType === 'character' ? LOAD_CHARACTERS : LOAD_JOURNEYS);
    fetch(`${loadResource}/${resourceId}`)
    .then(resp => resp.json())
    .then(obj => {
      // querent_ref example:
      // "p1, 4 inverted, 45 upright, 16 upright"

      Object.assign(pointState[activeLoadMenuType], (({id, name}) => ({id, name}))(obj));
      LoadMenuItems.pushPoints.call(pointState[activeLoadMenuType], obj.points);

      if (activeLoadMenuType==='journey' && obj.hasOwnProperty('character')) {
        Object.assign(pointState.character, (({id, name}) => ({id, name}))(obj.character));
        LoadMenuItems.pushPoints.call(pointState.character, obj.character.points);
      }
    })
    .then(obj => callback())
  }

  static loadToCardsFromPointState() {
    document.querySelector('div.create-character input').value = pointState.character.name || "Character";
    document.querySelector('#journey-title input[type="text"]').value = pointState.journey.name || "Journey";
    for (const cardContainer of document.querySelectorAll('div.point-container')) {
      const pointType = cardContainer.classList[1];
      const pointName = cardContainer.classList[2];
      const pointCards = pointState[pointType][pointName].cards;
      const drawn = pointCards.length === 1 || pointCards.length === 2;
      
      cardContainer.children[0].removeChild(cardContainer.querySelector('img'));
      
      if (drawn) {
        fetch(`${GET_CARD}/${pointCards[0].id}`)
        .then(resp => resp.json())
        .then(card => {
          cardContainer.children[0].prepend(menuLibrary.makeImage(Object.assign({}, card, {
            drawn: drawn,
            state: pointCards[0].state
          })));
          cardContainer.children[0].classList.add('drawn-card');
          cardContainer.querySelector('img').classList.add('card');

        });
      } else {
        cardContainer.children[0].prepend(menuLibrary.makeImage({drawn:drawn}))
        cardContainer.querySelector('img').classList.add('card');
      }
    }
  }
}

class LoadJourneyItems extends LoadMenuItems {
  constructor(obj) {
    super(obj);
    if (obj.character) {
      this.character = obj.character;
      this.node.lastChild.appendChild(document.createElement('p'));
      this.node.lastChild.lastChild.innerText = `Character: ${this.character.name}`
    }
    this.node.classList.add('journey', this.id);
  }
}

class LoadCharacterItems extends LoadMenuItems {
  constructor(obj) {
    super(obj);
    this.node.classList.add('character', this.id);
  }
}


//////////////////////////////////////////////////////////////////
/////////////////    load procedures
/////////////////////////////////////////////////////////////////

const loadMenuOpens = function() {
  const loadMenuContainer = document.createElement('div');
  loadMenuContainer.className = 'load-menu menu-container';

  const activeContainer = document.createElement('div');
  activeContainer.className = 'load-menu active-container';
  const activeHeader = document.createElement('h4');
  activeHeader.innerText = `Load ${capitalized.call(activeLoadMenuType)}`;
  const activeCardsContainer = document.createElement('div');
  activeCardsContainer.className = 'load-menu active-container cards-container';

  const inactiveContainer = document.createElement('div');
  inactiveContainer.className = 'load-menu inactive-container';
  
  const inactiveLabel = document.createElement('span');
  inactiveLabel.className = 'load-menu inactive-label';
  inactiveLabel.innerText = `Load ${capitalized.call(inActiveLoadMenuType())}`
  inactiveLabel.addEventListener('click', switchActiveMenu);
  
  getActiveMenuItems();
  
  activeContainer.append(activeHeader, activeCardsContainer);
  inactiveContainer.appendChild(inactiveLabel);
  loadMenuContainer.append(activeContainer, inactiveContainer);
  document.getElementById('view-wrapper').prepend(loadMenuContainer);
  document.querySelector('div.load-menu.tab.inactive').className = 'load-menu tab active';
}


const getActiveMenuItems = function() {
  const loadResource = (activeLoadMenuType === 'character' ? LOAD_CHARACTERS : LOAD_JOURNEYS);
  fetch(loadResource)
  .then(resp => resp.json())
  .then(obj => {
    let sortedItems, sortedPoints;
    if (activeLoadMenuType === 'character') {
      sortedItems = [...obj].sort(LoadMenuItems.sortUpdatedAt).map(a => {
        sortedPoints = a.points.sort(LoadMenuItems.sortUpdatedAt)
        return new LoadCharacterItems(a);
        
      });
    } else {
      sortedItems = obj.sort(LoadMenuItems.sortUpdatedAt).map(a => {
        return new LoadJourneyItems(a)
      });
    };

    const cardsContainer = document.querySelector('div.load-menu.cards-container');
    for (const item of sortedItems) {
      cardsContainer.appendChild(item.node);
      fetch(`${GET_CARD}/${item.points[0].cards[0].id}`)
      .then(resp => resp.json())
      .then(obj => {
        item.node.querySelector('img').src = (obj.card_type === 'major' ? `assets/card-images/major/${obj.value}.jpg` : `assets/card-images/minor/${obj.suit[0].toUpperCase() + obj.suit.slice(1)}/${obj.value}.jpg`);
      })

      if (item.points[0].querent_ref.split(" ")[1] === "inverted") {
        item.node.querySelector('img').classList.add('inverted-card')
      }
      item.node.querySelector('.load-menu.menu-card-content.img-container').addEventListener('click', () => {
        LoadMenuItems.loadToPointState(LoadMenuItems.loadToCardsFromPointState);
        document.getElementById('modal').click();
      });
    }

    const configObj = {
      paragraphText: [`Create new ${activeLoadMenuType}`]
    };

    cardsContainer.appendChild(loadLibrary.makeCard(configObj));
    const lastImageContainer = cardsContainer.querySelector('.load-menu.menu-card:last-child .img-container');
    lastImageContainer.querySelector('img').src = 'assets/card-images/x-small.jpg';
    lastImageContainer.appendChild(loadLibrary.makePlusOverlay());
    lastImageContainer.addEventListener('click', () => {
      pointStateInitialize();
      LoadMenuItems.loadToCardsFromPointState();
      document.getElementById('modal').click();
    }, {once:true})

  })
}

const loadMenuCloses = function() {
  document.querySelector('.load-menu.menu-container').classList.add('disappear');
  modalCanClose(event);
  clearChildren(document.querySelector('div.load-menu.cards-container'));
  document.getElementById('view-wrapper').removeChild(document.querySelector('.load-menu.menu-container'));
  document.querySelector('div.load-menu.tab.active').className = 'load-menu tab inactive';
}

const switchActiveMenu = function() {
  document.querySelector('.load-menu.inactive-label').innerText = `Load ${capitalized.call(activeLoadMenuType)}`;
  activeLoadMenuType = inActiveLoadMenuType();
  document.querySelector('.load-menu.active-container h4').innerText = `Load ${capitalized.call(activeLoadMenuType)}`;

  clearChildren(document.querySelector('div.load-menu.cards-container'));
  getActiveMenuItems();
} 