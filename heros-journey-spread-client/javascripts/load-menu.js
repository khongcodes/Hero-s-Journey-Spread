//////////////////////////////////////////////////////////////////
/////////////////    BEGINNING functional library for load-menu
/////////////////////////////////////////////////////////////////

const loadLibrary = (function() {
  return {
    makeImage: function() {
      const cardImage = document.createElement('img');
      cardImage.src = 'assets/card-images/x-small.jpg';
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
  activeHeader.innerText = `Load ${activeLoadMenuTypeCapitalized()}`;
  const activeCardsContainer = document.createElement('div');
  activeCardsContainer.className = 'load-menu active-container cards-container';

  const inactiveContainer = document.createElement('div');
  inactiveContainer.className = 'load-menu inactive-container';
  
  const inactiveLabel = document.createElement('span');
  inactiveLabel.className = 'load-menu inactive-label';
  inactiveLabel.innerText = `Load ${(activeLoadMenuType === 'character' ? 'Journey' : 'Character')}`
  inactiveLabel.addEventListener('click', switchActiveMenu);
  
  getActiveMenuItems();
  // should have a card for new character under current journey
  // should have a card for new journey under current character
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
    let sortedItems;
    if (activeLoadMenuType === 'character') {
      sortedItems = obj.sort(LoadMenuItems.sortUpdatedAt).map(a => new LoadCharacterItems(a));
    } else {
      sortedItems = obj.sort(LoadMenuItems.sortUpdatedAt).map(a => new LoadJourneyItems(a));
    };

    const cardsContainer = document.querySelector('div.load-menu.cards-container');
    for (const item of sortedItems) {
      cardsContainer.appendChild(item.node);
    }

    const configObj = {
      paragraphText: [`Create new ${activeLoadMenuType}`]
    };
    cardsContainer.appendChild(loadLibrary.makeCard(configObj));
    cardsContainer.querySelector('.load-menu.menu-card:last-child .img-container').appendChild(loadLibrary.makePlusOverlay());
  })
}

const loadMenuCloses = function() {
  clearChildren(document.querySelector('div.load-menu.cards-container'));
  document.getElementById('view-wrapper').removeChild(document.querySelector('.load-menu.menu-container'));
  document.querySelector('div.load-menu.tab.active').className = 'load-menu tab inactive';

}

const switchActiveMenu = function() {
  document.querySelector('.load-menu.inactive-label').innerText = `Load ${activeLoadMenuTypeCapitalized()}`;
  activeLoadMenuType = (activeLoadMenuType === 'character' ? 'journey' : 'character');
  document.querySelector('.load-menu.active-container h4').innerText = `Load ${activeLoadMenuTypeCapitalized()}`;

  clearChildren(document.querySelector('div.load-menu.cards-container'));
  getActiveMenuItems();
} 