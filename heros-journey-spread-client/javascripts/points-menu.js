//////////////////////////////////////////////////////////////////
/////////////////    BEGINNING functional library for points-menu
/////////////////////////////////////////////////////////////////

const menuLibrary = (function() {
  const nameIncludeState = function(configObj) {
    return (configObj.state ==='upright' ? configObj.name : `${configObj.name}, Inverted`);
  };

  const cardMeaningListIncludeState = function(configObj) {
    let assignMeaning = (configObj.state === 'upright' ? configObj.meaning_up : configObj.meaning_inv);
    return assignMeaning.split(", ").map(meaning => {
      const listItem = document.createElement('li');
      listItem.innerText = meaning[0].toUpperCase() + meaning.slice(1);
      return listItem;
    });
  };
  
  return {
    placeInfoSubHeader: function(string) {
      const actuallyParagraph = document.createElement('p');
      console.log(string);
      actuallyParagraph.innerText = string;
      actuallyParagraph.className = 'points-menu subheader-info';
      this.appendChild(actuallyParagraph);
    },
    
    placeInfoContent: function(nodeClicked) {
      const contentSplit = JOURNEYPOINTSDATA[nodeClicked.classList[2]].info.split('\n').map(par => {
        const infoContent = document.createElement('p');
        infoContent.innerText = par;
        infoContent.className = 'points-menu info-content'
        return infoContent;
      })
      this.append(...contentSplit);
    },
    
    placeCardContainer: function(classOption=false) {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'points-menu card-container';
      if (classOption) {
        cardContainer.classList.add(classOption);
      }
      this.appendChild(cardContainer);
      return cardContainer;
    },

    makeImage: function(configObj) {
      const cardImage = document.createElement('img');
      if (!configObj.drawn) {
        cardImage.src = 'assets/card-images/x.jpg';
        cardImage.alt = 'card-back';
        cardImage.className = 'points-menu draw-card';
      } else {
        if (configObj.card_type === 'major') {
          cardImage.src = `assets/card-images/major/${configObj.value}.jpg`;
        } else {
          cardImage.src = `assets/card-images/minor/${configObj.suit}/${configObj.value}.jpg`;
        }
        cardImage.alt = `${configObj.name}`;
        cardImage.className = 'points-menu drawn-card';
        
        if (configObj.state === 'inverted') {
          cardImage.classList.add('inverted-card');
        }
      };
      return cardImage;
    },

    placeCardOverlay: function() {
      const overlayDiv = document.createElement('div');
      overlayDiv.className = 'points-menu card-overlay';
      this.appendChild(overlayDiv);
    },

    placeCardTextOverlay: function(string) {
      const textOverlay = document.createElement('div');
      textOverlay.className = 'points-menu card-text-overlay';
      textOverlay.appendChild(document.createElement('h2'));
      textOverlay.childNodes[0].innerText = string;
      this.appendChild(textOverlay);
    },

    place3CardTextOverlay: function(configObj) {
      const textOverlay = document.createElement('div');
      textOverlay.className = 'points-menu card-text-overlay';

      const cardName = document.createElement('h2');
      cardName.innerText = (configObj.state ==='upright' ? configObj.name : `${configObj.name}, \nInverted`);
      textOverlay.appendChild(cardName);

      let assignMeaning = (configObj.state === 'upright' ? configObj.meaning_up : configObj.meaning_inv);
      let meanings = assignMeaning.split(", ").map(meaning => {
        const meaningItem = document.createElement('p');
        meaningItem.innerText = meaning[0].toUpperCase() + meaning.slice(1);
        return meaningItem;
      });
      textOverlay.append(...meanings);

      this.appendChild(textOverlay);
    },

    placeCardDescription: function(configObj) {
      const descriptionContainer = document.createElement('div');
      descriptionContainer.className = 'points-menu card-desc-container';
      const cardTitle = document.createElement('h3');
      cardTitle.className = 'points-menu card-name';
      const cardTraits = document.createElement('div');
      cardTraits.className = 'points-menu card-traits';
      const cardDesc = document.createElement('p');
      const cardMeaning = document.createElement('ul');
      cardMeaning.className = 'points-menu card-meaning-list'

      cardTitle.innerText = nameIncludeState(configObj);
      cardMeaning.append(...cardMeaningListIncludeState(configObj));  
      cardDesc.innerText = configObj.desc;
    
      cardTraits.append(cardDesc, cardMeaning);
      descriptionContainer.append(cardTitle, cardTraits);
      this.appendChild(descriptionContainer);
    },

    placeDescriptionForm: function(configObj) {
      const br = function() {
        return document.createElement('br')
      }
      const formHolder = document.createElement('div');
      formHolder.className = 'points-menu description-form-container';
      
      const descriptionForm = document.createElement('form');
      descriptionForm.className = 'points-menu description-form';

      const descriptionLabel = document.createElement('label');
      descriptionLabel.innerText = 'Description (optional): ';

      const descriptionInput = document.createElement('textarea');
      if (configObj.point_type === 'journey') {
        descriptionInput.placeholder = "How does this card relate to this story point?\nWhat do we see?";
      } else {
        descriptionInput.placeholder = "How does this card relate to your character?";
      };
      

      const descriptionSubmit = document.createElement('input');
      descriptionSubmit.type = 'submit';
      descriptionSubmit.value = 'Save story point';

      descriptionForm.append(descriptionLabel, br(), descriptionInput, br(), descriptionSubmit)
      formHolder.appendChild(descriptionForm);
      this.appendChild(formHolder);
    },



  }
})();



//////////////////////////////////////////////////////////////////
///////////////////////////       Points-menu utilities
/////////////////////////////////////////////////////////////////


const cardState = function() {
  const invertedFactor = 40;
  const randNum = Math.floor(Math.random() * 100);
  let cardState;
  if (randNum <= invertedFactor) {
    cardState = 'inverted'
  } else {
    cardState = 'upright'
  }
  return cardState;
};

// Sometimes cursor is inaccurate
// look for card-container div among parent and child nodes of event target
// used in characterPoint card select - when there is more than one card
const getCardClicked = function(node) {
  if (([...node.childNodes]!==undefined && [...node.childNodes].length!==0) && [...node.childNodes].map(child => /card-container/.test(child.className)).includes(true)) {
    node = node.querySelector('.card-container');
  } else {
    while (![...node.classList].includes('card-container')) {
      node = node.parentNode;
    }
  }
  return node;
}


//////////////////////////////////////////////////////////////////
///////////////////////////       points-menu stage controller
/////////////////////////////////////////////////////////////////


// enter from INDEX.JS
const characterOrJourneyPointsMenu = function(event, nodeClicked) {
  let pointMenuNode = document.querySelector('div.points-menu');
  if ([...event.target.classList].includes('character')) {;
    pointMenuNode.classList.add('character', nodeClicked.classList[2])
    loadCharacterPointContent(pointMenuNode, nodeClicked);
  } else {
    // add current point to classList of menu so eventhandler can know what point to reference
    pointMenuNode.classList.add('journey', nodeClicked.classList[2])
    loadJourneyPointContent(pointMenuNode, nodeClicked);
  };
  return pointMenuNode;
};

const unloadPointsMenuNode = function(menu) {
  if ([...menu.classList].includes('character')) {
    menu.querySelector('div.points-menu.header-container').removeChild(menu.querySelector('p'));
  } else {
    menu.querySelector('h2.points-menu.header-content').innerText = "";
    menu.querySelector('p.points-menu.info-content').innerText = ""
  }
  menu.className = 'points-menu container'

  for (const column of menu.getElementsByClassName('column')) {
    clearChildren(column)
  }
};

// DEPENDS ON CLASSLIST STAYING IN SAME ORDER
const loadJourneyPointContent = function(pointMenuNode, nodeClicked) {
  let pointTitle = pointMenuNode.querySelector('h2.points-menu.header-content');
  pointTitle.innerText = JOURNEYPOINTSDATA[nodeClicked.classList[2]].title;
  menuLibrary.placeInfoContent.call(pointMenuNode.querySelector('.column.c1'), nodeClicked);

  switch (pointState.journey[nodeClicked.classList[2]].cards.length) {
    case 0:
      loadJourneyPointStage0(pointMenuNode, nodeClicked);
      break;
    case 1:
      loadJourneyPointStage1(pointMenuNode, nodeClicked);
      break;
    // future feature - draw another card for additional context, case 2
  };
};

const loadCharacterPointContent = function(pointMenuNode, nodeClicked) {
  let pointTitle = pointMenuNode.querySelector('h2.points-menu.header-content');
  pointTitle.innerText = CHARACTERPOINTSDATA[nodeClicked.classList[2]].title;
  menuLibrary.placeInfoSubHeader.call(pointMenuNode.querySelector('.points-menu.header-container'), CHARACTERPOINTSDATA[nodeClicked.classList[2]].info);

  switch (pointState.character[nodeClicked.classList[2]].cards.length) {
    case 0:
      loadCharacterPointStage0(pointMenuNode, nodeClicked);
      break;
    case 3:
      loadCharacterPointStage1(pointMenuNode, nodeClicked);
      break;
    case 1:
      loadCharacterPointStage2(pointMenuNode, nodeClicked);
      break;
    // future feature - draw another card for additional context, case 2
  }
}

///////////////////////////////////////////////////////////////////
////////////////////////////////    journey points menu operations
////////////////////////////////////////////////////////////////

const loadJourneyPointStage0 = function(pointMenuNode, nodeClicked) {
  const cardContainer = menuLibrary.placeCardContainer.call(pointMenuNode.querySelector('.column.c2'));
  cardContainer.appendChild(menuLibrary.makeImage({drawn: false}));
  menuLibrary.placeCardOverlay.call(cardContainer);
  menuLibrary.placeCardTextOverlay.call(cardContainer, 'Click to draw a card');
  cardContainer.addEventListener('click', changeJourneyPointStage0to1, {once:true});
}

const changeJourneyPointStage0to1 = function() {
  const cardContainer = document.querySelector('div.points-menu.card-container');
  const currentPoint = document.querySelector('div.points-menu.container').classList[3];
  fetch(RANDOM_CARD)
  .then(resp => resp.json())
  .then(card => {
    const configObj = Object.assign({}, card[0], {
      drawn: true,
      state: cardState(),
      point_type: 'journey'
    })
    
    pointState.journey[currentPoint].cards.push({
      id: card[0].id,
      state: configObj.state,
    })
    
    clearChildren(cardContainer);
    cardContainer.appendChild(menuLibrary.makeImage(configObj))
    menuLibrary.placeCardDescription.call(document.querySelector('div.points-menu.column.c3'), configObj);
    menuLibrary.placeDescriptionForm.call(document.querySelector('div.points-menu.column.c1'), configObj);

    const journeyPointImageContainer = document.querySelector(`.point-container.${currentPoint} .img-overlay-container`);
    journeyPointImageContainer.removeChild(journeyPointImageContainer.querySelector('img.card'));
    journeyPointImageContainer.prepend(menuLibrary.makeImage(configObj));
    journeyPointImageContainer.childNodes[0].classList.remove('points-menu');
    journeyPointImageContainer.childNodes[0].classList.add('card');
    journeyPointImageContainer.classList.add('drawn-card');
    
  })
}

const loadJourneyPointStage1 = function(pointMenuNode, nodeClicked) {
  const cardContainer = menuLibrary.placeCardContainer.call(pointMenuNode.querySelector('.column.c2'));

  const currentPoint = pointMenuNode.classList[3];
  fetch(`${GET_CARD}/${pointState.journey[currentPoint].cards[0].id}`)
  .then(resp => resp.json())
  .then(obj => {
    const configObj = Object.assign({}, obj, {
      drawn: true,
      state: pointState.journey[currentPoint].cards[0].state,
      point_type: 'journey'
    })

    cardContainer.appendChild(menuLibrary.makeImage(configObj));
    menuLibrary.placeCardDescription.call(pointMenuNode.querySelector('.column.c3'), configObj);
    menuLibrary.placeDescriptionForm.call(pointMenuNode.querySelector('.column.c1'), configObj);
  })
};


/////////////////////////////////////////////////////////////
//////////////////////////////     CHARACTER POINTS MENU WORK
/////////////////////////////////////////////////////////////

const loadCharacterPointStage0 = function(pointMenuNode, nodeClicked) {
  const cardContainer = menuLibrary.placeCardContainer.call(pointMenuNode.querySelector('div.column.c2'));
  cardContainer.appendChild(menuLibrary.makeImage({drawn: false}));
  menuLibrary.placeCardOverlay.call(cardContainer);
  menuLibrary.placeCardTextOverlay.call(cardContainer, 'Draw three\nChoose one');
  cardContainer.addEventListener('click', changeCharacterPointStage0to1, {once:true});
}

const changeCharacterPointStage0to1 = function() {
  clearChildren(document.querySelector('div.points-menu.column.c2'));
  const currentPoint = document.querySelector('div.points-menu.container').classList[3];

  fetch(RANDOM_THREE)
  .then(resp => resp.json())
  .then(cards => {
    for (const card of cards) {
      const configObj = Object.assign({}, card, {
        drawn: true,
        state: cardState()
      });

      pointState.character[currentPoint].cards.push({
        id: card.id,
        state: configObj.state,
      });

      const cardContainer = menuLibrary.placeCardContainer.call(document.querySelector(`div.column.c${cards.indexOf(card)+1}`), configObj.id);
      cardContainer.appendChild(menuLibrary.makeImage(configObj));
      menuLibrary.placeCardOverlay.call(cardContainer);
      menuLibrary.place3CardTextOverlay.call(cardContainer, configObj);
      cardContainer.addEventListener('click', changeCharacterPointStage1to2);
    }
  });
}

const loadCharacterPointStage1 = function(pointMenuNode, nodeClicked) {
  const currentPoint = nodeClicked.classList[2];
  for (const card of pointState.character[currentPoint].cards) {
    fetch(`${GET_CARD}/${card.id}`)
    .then(resp => resp.json())
    .then(card => {
      const configObj = Object.assign({}, card, {
        drawn: true,
        state: pointState.character[currentPoint].cards.find(c => c.id === card.id).state,
        point_type: 'character'
      })

      const whichColumn = pointState.character[currentPoint].cards.indexOf(pointState.character[currentPoint].cards.find(c => c.id === card.id)) + 1;
      const cardContainer = menuLibrary.placeCardContainer.call(pointMenuNode.querySelector(`div.column.c${whichColumn}`), configObj.id);
      cardContainer.appendChild(menuLibrary.makeImage(configObj));
      menuLibrary.placeCardOverlay.call(cardContainer);
      menuLibrary.place3CardTextOverlay.call(cardContainer, configObj);
      cardContainer.addEventListener('click', changeCharacterPointStage1to2, {once:true});
    })
  }
}

const changeCharacterPointStage1to2 = function(event) {
  const cardContainer = document.querySelector('.points-menu.column.c2 div.card-container');
  const currentPoint = document.querySelector('div.points-menu.container').classList[3];
  const cardKeep = getCardClicked(event.target).classList[2];
  pointState.character[currentPoint].cards = pointState.character[currentPoint].cards.filter(card => card.id === parseInt(cardKeep, 10));

  for (const node of [document.querySelector('div.points-menu.column.c1'), document.querySelector('div.points-menu.column.c3')]) {
    clearChildren(node);
  }
  cardContainer.className = 'points-menu card-container';
  clearChildren(cardContainer);

  fetch(`${GET_CARD}/${cardKeep}`)
  .then(resp => resp.json())
  .then(card => {
    const configObj = Object.assign({}, card, {
      drawn: true,
      state: pointState.character[currentPoint].cards[0].state,
      point_type: 'character'
    });

    cardContainer.appendChild(menuLibrary.makeImage(configObj));
    menuLibrary.placeCardDescription.call(document.querySelector('div.points-menu.column.c3'), configObj);
    menuLibrary.placeDescriptionForm.call(document.querySelector('div.points-menu.column.c1'), configObj);

    const characterPointImageContainer = document.querySelector(`.point-container.${currentPoint} .img-overlay-container`);
    characterPointImageContainer.removeChild(characterPointImageContainer.querySelector('img.card'));
    characterPointImageContainer.prepend(menuLibrary.makeImage(configObj));
    characterPointImageContainer.childNodes[0].classList.remove('points-menu');
    characterPointImageContainer.childNodes[0].classList.add('card');
    characterPointImageContainer.classList.add('drawn-card');
  })
}

const loadCharacterPointStage2 = function(pointMenuNode, nodeClicked) {
  const cardContainer = menuLibrary.placeCardContainer.call(pointMenuNode.querySelector('.column.c2'));
  const currentPoint = nodeClicked.classList[2];
  fetch(`${GET_CARD}/${pointState.character[currentPoint].cards[0].id}`)
  .then(resp => resp.json())
  .then(card => {
    const configObj = Object.assign({}, card, {
      drawn: true,
      state: pointState.character[currentPoint].cards[0].state,
      point_type: 'character'
    });

    cardContainer.appendChild(menuLibrary.makeImage(configObj));
    menuLibrary.placeCardDescription.call(pointMenuNode.querySelector('.column.c3'), configObj);
    menuLibrary.placeDescriptionForm.call(pointMenuNode.querySelector('.column.c1'), configObj);
  })
}
