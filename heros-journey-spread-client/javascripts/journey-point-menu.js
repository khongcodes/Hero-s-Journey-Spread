const JOURNEYPOINTSDATA = {
  point1: {
    title: "1. The Ordinary World",
    info: "The story begins with the character in their usual routine, unaware of the adventures about to unfold. This is a kind of safe place, or 'comfort zone', which they may or may not want to change. The protagonist's everyday life and routines are presented in a way which endears them to us, and makes us sympathize with their plight. In this stage, we learn important details about our hero, their outlook and personality, backstory, and what they're capable of."
  },
  point2: {
    title: "2. The Call To Adventure",
    info: "This is the scene or event which begins the adventure. A call to action, jolting the character out of the familiar, and urging them to undertake the quest. It usually disrupts their peace somehow, threatening what thy know and love, though it doesn't always have to be a traumatic or violent event. Sometimes it comes in the form of a message, a conversation, a chance meeting, or a nagging liability they've tried to avoid thus far. Either way, the Ordinary World is about to change, and the character must do something about it, whether they like it or not."
  },
  point3: {
    title: "3. Refusal of the Call",
    info: "Even if the character is eager to face their new challenge, they'll face fears and doubts about it. This deepens our relationship with them, and makes them more human. They may feel they don't have what it takes to succeed, or perhaps they don't want to disturb the Ordinary World which they're so used to. Perhaps they fear for the welfare of a loved one, or going against the status quo. They will be obstinate against taking necessary action, and this will likely cause more suffering or trouble as a result."
  },
  point4: {
    title: "4. Meeting the Mentor",
    info: "Vital guidance and encouragement arrive at this stage, spurning the character to action in spite of their contradictions. It could be in the form of a person, or an event, but something will give them the confidence they need to continue. They might receive sage advice, an important object, or training in the areas they need to face the challenge."
  },
  point5: {
    title: "5. Crossing the Threshold",
    info: "The character finally makes their first move, and begins the quest, in whatever form it takes. They may begin it willingly, or they may be forced, but either way, their Ordinary World is about to become not so ordinary. Perhaps they leave home, or do something they were always reluctant or scared to do before. In any case, everything familiar will be thrown aside as they take those first uncertain steps."
  },
  point6: {
    title: "6. Tests, Allies, Enemies",
    info: "This stage presents the obstacles the character must overcome. Allies and enemies may present themselves, and offer further insight into the deeper challenges till to come. The character's powers/talents/abilities will be tested, providing further understanding of their deepest motivations, and helping us relate to them better."
  },
  point7: {
    title: "7. The Approach to the Innermost Cave",
    info: "The innermost cave represents a resurgence of the original doubt and fear the character had about their adventure. At this point, there will be a brief moment of reconsideration, respite, making preparations, and gathering strength before they dive into the final challenge. This stage deepens the magnitude of the conflict, raises the stakes, and escalates the tension of the plot."
  },
  point8: {
    title: "8. The Ordeal",
    info: "This is the first major climactic point of the story, the event or inner conflict in which the protagonist must use every ability, insight, and strength to overcome their greatest threat to their life or world. They might face their greatest foe, or overcome their greatest fear. If they don't succeed, they face death, or devastation of everything they care about. The character must undergo some sort of transformation to achieve the goal. A sacrifice may be required, whether personal or in their world at large."
  },
  point9: {
    title: "9. The Reward (Seizing the Sword)",
    info: "After the final battle is won, the protagonist emerges as a new and stronger person. The Reward is what they obtain from the experience - an object of great importance or power, reunion with a loved one, learning a great secret, solving a vital riddle, bringing peace where there once was none, or the satisfaction received when they've overcome their greatest personal crisis or fear. The Reward may help them on their way back to the Ordinary World they love, but they must still remain vigilant for the last road of their adventure. It isn't time to rest just yet."
  },
  point10: {
    title: "10. The Road Back",
    info: "As the character begins to turn home with their reward, they face another choice on this last stage of their adventure. Perhaps they must give up their personal desires for a higher purpose, or their remaining enemies will pursue them. A reversal of the Call to Action, in that instead of fear or danger, they now will face exoneration and success when they cross the final threshold and return to their Ordinary World."
  },
  point11: {
    title: "11. Resurrection",
    info: "The last and greatest obstacle before the character reaches home, another moment of death and rebirth/transformation which our hero must endure. The ultimate climactic point in the story/final battle against evil. This test represents something far greater than the character, and will threaten their Ordinary World and everyone they know and love within it. Overall, the character will prevail against their adversaries, and be transformed/purified a final time."
  },
  point12: {
    title: "12. Return with the Elixir",
    info: "The hero returns home a changed person, having learned much from their experiences, and with new insight about their life and the world in general. Now that they've faced and overcome death, they look forward to starting anew, and continuing their life. The enemies have all been punished, allies rewarded, and the protagonist brings home what the Ordinary World needs to go on after the trial has been overcome. The final reward brings new hope, solutions to the problems, and an end to suffering. Overall, the character has changed, and will be a different person than they were to begin with."
  }
}

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

  };
};

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