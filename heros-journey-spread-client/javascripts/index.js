const BASE_URL = 'http://localhost:3000';
const GET_CARD = `${BASE_URL}/cards`;
const RANDOM_CARD = `${GET_CARD}/random/1`;
const RANDOM_THREE = `${GET_CARD}/random/3`;
const CHARACTERS = `${BASE_URL}/characters`
const JOURNEYS = `${BASE_URL}/journeys`
const POINTS = `${BASE_URL}/points`

let modalActive = false;
let activeLoadMenuType = 'character';
const pointsModal = document.querySelector('div#modal');
let loadWarning;

const pointState = {
  character: {},
  journey: {}
}

// partial example of pointState once initialized:
// journey: {
//   point0: {
//     cards: [
//       {id:45, state:'upright'},
//       {id:26, state:'inverted'}
//     ],
//     id: (an integer or string of an integer)
//     description: "user inputted text"
//   },
//   point1: {
//     cards: [
//       {...}
//     ],
//     ...
//   }
// }


document.addEventListener('DOMContentLoaded', () => {
  PointStateMaker.initialize();
  cardsOpenPointMenuModal();
  loadMenuResponds();
  saveButtonsSave();
  nameInputUpdatesPointState();
  disappearNameHelpText();
});

//////////////////////////////////////////////////////////////////
///////////////////////////       Functions in main program
/////////////////////////////////////////////////////////////////

const cardsOpenPointMenuModal = function() {
  const cardContainerNodes = document.getElementsByClassName('point-container');
  
  for (const node of cardContainerNodes) {
    node.addEventListener('click', function(event) {
      // JUMP TO [points-menu.js:5] on charcterOrJourneyPointsMenu()
      let pointMenuNode = characterOrJourneyPointsMenu(event, node);

      pointMenuNode.style.display = 'block';
      pointMenuNode.classList.add("visible");
      indexUtility.modalCanOpen();
      document.getElementById('modal').addEventListener('click', event => {
        indexUtility.modalCanClose(event);
        unloadPointsMenuNode(pointMenuNode);
        pointMenuNode.style.display = 'none';
        pointMenuNode.classList.remove("visible");
      }, {once:true});
    }); 
  };
};

const loadMenuResponds = function() {
  document.querySelector('.load-menu.tab.inactive').addEventListener('click', function() {
    if (!modalActive) {
      // JUMP TO [load-menu.js:5] on loadMenuOpens()
      loadMenuOpens();

      indexUtility.modalCanOpen();
      document.getElementById('modal').addEventListener('click', loadMenuCloses, {once:true})
    }
  });
}

const saveButtonsSave = function() {
  const characterButton = document.querySelector('div#sidebar form input[type="submit"]');
  const journeyButton = document.querySelector('div#main form input[type="submit"]');
  // JUMP TO [save.js:5] on resourceSaves()
  characterButton.addEventListener('click', nonPointResourceButton)
  journeyButton.addEventListener('click', nonPointResourceButton)
}

const nameInputUpdatesPointState = function() {
  for (const element of  document.querySelectorAll('input[type="text"]')) {
    element.addEventListener('change', () => {
      if (element.parentNode.classList[1] === 'character-name') {
        pointState.character.name = element.value;
      } else {
        pointState.journey.name = element.value;
      }
    })
  }
}

const disappearNameHelpText = function() {
  const jNameInput = document.querySelector('#journey-title input[type="text"]');
  const cNameInput = document.querySelector('.create-character.character-name input[type="text"]');
  
  jNameInput.addEventListener('click', () => {
    document.querySelector('#journey-title p').classList.add('hide')
  }, {once:true})
  
  cNameInput.addEventListener('click', () => {
    document.querySelector('.create-character.character-name p').classList.add('hide')
  }, {once:true})
  
}


//////////////////////////////////////////////////////////////////
///////////////////////////       Classes
/////////////////////////////////////////////////////////////////

class PointStateMaker {
  constructor(num, type){
    const key = (type==='character' ? `p${num}` : `point${num}`)
    this[key] = {
      id: "",
      cards: [],
      description: ""
    }
  }

  static initializeJourney() {
    for (let i=1; i<=12; i++) {
      Object.assign(pointState.journey, new PointStateMaker(i, "journey"))
    };
    Object.assign(pointState.journey, {id:'', name:''});
  }

  static initializeCharacter() {
    for (let i=1; i<=4; i++) {
      Object.assign(pointState.character, new PointStateMaker(i, "character"))
    }
    Object.assign(pointState.character, {id:'', name:''});
  }

  static initialize() {
    this.initializeJourney();
    this.initializeCharacter();
  };
}


////////////////////////////////////////////////////////////////////////////
/////////      indexUtility - Functional library defined in index.js
//////////////////////////////////////////////////////////////////////////

const indexUtility = (function() {
  return {
    modalCanOpen: function() {
      modalActive = true;
      pointsModal.style.display = 'block';
    },

    modalCanClose: function() {
      if (event.target === pointsModal && modalActive === true) {
        modalActive = false;
        pointsModal.style.display = 'none';
      };
    },

    clearChildren: function() {
      while (this.lastChild) {
        this.removeChild(this.lastChild);
      }
    },

    popupMessage: function(string) {
      const popup = document.querySelector('.popup')
      popup.innerText = string;
      popup.className = 'popup visible';
      setTimeout(() => {
        popup.className = 'popup fadeout';
        setTimeout(() => popup.className = 'popup invisible', 800)
      }, 800)
    }
  }
})();