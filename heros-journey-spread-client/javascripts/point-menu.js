const menuLibrary = (function() {
  return {
    placeInfoContent: function(nodeClicked) {
      const infoContent = document.createElement('p');
      infoContent.className = 'points-menu info-content';
      infoContent.innerText = JOURNEYPOINTSDATA[nodeClicked.classList[2]].info;
      this.appendChild(infoContent);
    },
    
    placeCardContainer: function() {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'points-menu card-container';
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

    placeCardTextOverlay: function() {
      const textOverlay = document.createElement('div');
      textOverlay.className = 'points-menu card-text-overlay';
      textOverlay.appendChild(document.createElement('h2'));
      textOverlay.childNodes[0].innerText = 'Click to draw a card';
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
      let assignMeaning;

      if (configObj.state === 'upright') {
        cardTitle.innerText = configObj.name;
        assignMeaning = configObj.meaning_up;
      } else {
        cardTitle.innerText = `${configObj.name}, Inverted`;
        assignMeaning = configObj.meaning_inv;
      }
      cardDesc.innerText = configObj.desc;
      for (const meaning of assignMeaning.split(", ")) {
        const listItem = document.createElement('li');
        listItem.innerText = meaning[0].toUpperCase() + meaning.slice(1);
        cardMeaning.appendChild(listItem);
      };

      cardTraits.append(cardDesc, cardMeaning);
      descriptionContainer.append(cardTitle, cardTraits);
      this.appendChild(descriptionContainer);
    },

    placeDescriptionForm: function() {
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
      descriptionInput.placeholder = "How does this card relate to this story point?\nWhat do we open on?"

      const descriptionSubmit = document.createElement('input');
      descriptionSubmit.type = 'submit';
      descriptionSubmit.value = 'Save story point';

      descriptionForm.append(descriptionLabel, br(), descriptionInput, br(), descriptionSubmit)
      formHolder.appendChild(descriptionForm);
      this.appendChild(formHolder);
    },



  }
})();

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
  console.log(nodeClicked);
}

const loadJourneyPointStage0 = function(pointMenuNode, nodeClicked) {
  const cardContainer = menuLibrary.placeCardContainer.call(pointMenuNode.querySelector('.column.c2'));
  cardContainer.appendChild(menuLibrary.makeImage({drawn: false}));
  menuLibrary.placeCardOverlay.call(cardContainer);
  menuLibrary.placeCardTextOverlay.call(cardContainer);
  cardContainer.addEventListener('click', changeJourneyPointStage0to1);
}

const changeJourneyPointStage0to1 = function() {
  const cardContainer = document.querySelector('div.points-menu.card-container');
  cardContainer.removeEventListener('click', changeJourneyPointStage0to1);
  const currentPoint = document.querySelector('div.points-menu.container').classList[3];
  fetch(RANDOM_CARD)
  .then(resp => resp.json())
  .then(card => {
    const configObj = Object.assign({}, card[0], {
      drawn: true,
      state: cardState()
    })
    
    pointState.journey[currentPoint].cards.push({
      id: card[0].id,
      state: configObj.state,
    })
    
    clearChildren(cardContainer);
    cardContainer.appendChild(menuLibrary.makeImage(configObj))
    menuLibrary.placeCardDescription.call(document.querySelector('div.points-menu.column.c3'), configObj);
    menuLibrary.placeDescriptionForm.call(document.querySelector('div.points-menu.column.c1'));

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

  const currentPoint = document.querySelector('div.points-menu.container').classList[3];
  fetch(`${GET_CARD}/${pointState.journey[currentPoint].cards[0].id}`)
  .then(resp => resp.json())
  .then(obj => {
    const configObj = Object.assign({}, {
      drawn:true,
      state:pointState.journey[currentPoint].cards[0].state
    }, obj)

    cardContainer.appendChild(menuLibrary.makeImage(configObj));
    menuLibrary.placeCardDescription.call(pointMenuNode.querySelector('div.column.c3'), configObj);
    menuLibrary.placeDescriptionForm.call(pointMenuNode.querySelector('div.column.c1'));
  })
};