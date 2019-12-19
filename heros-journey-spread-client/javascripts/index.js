const BASE_URL = 'http://localhost:3000';
const GET_CARD = `${BASE_URL}/cards`;
const RANDOM_CARD = `${GET_CARD}/random/1`;
const RANDOM_THREE = `${GET_CARD}/random/3`;
const LOAD_CHARACTERS = `${BASE_URL}/characters`
const LOAD_JOURNEYS = `${BASE_URL}/journeys`

let modalActive = false;
let activeLoadMenuType = 'character';
const pointsModal = document.querySelector('div#modal');

// Example of pointState
// point0: {
//   cards: [
//     {id:45, state:'upright'},
//     {id:26, state:'inverted'}
//   ],
//   description: "user inputted text"
// },
const pointState = {
  character: {},
  journey: {}
}

document.addEventListener('DOMContentLoaded', () => {
  pointStateInitialize();
  cardsOpenPointMenuModal();
  loadMenuResponds();
  saveButtonsSave();
  disappearNameHelpText();

});

//////////////////////////////////////////////////////////////////
///////////////////////////       Utilities
/////////////////////////////////////////////////////////////////

class PointStatePointMaker {
  constructor(num, type){
    const key = (type==='character' ? `p${num}` : `point${num}`)
    this[key] = {
      cards: [],
      description: ""
    }
  }
}

const pointStateInitialize = function() {
  for (let i=1; i<=4; i++) {
    Object.assign(pointState.character, new PointStatePointMaker(i, "character"))
  }

  for (let i=1; i<=12; i++) {
    Object.assign(pointState.journey, new PointStatePointMaker(i, "journey"))
  }
  
  for (const hasNameAndId of [pointState.journey, pointState.character]) {
    Object.assign(hasNameAndId, {id:'', name:''})
  }
};

const modalCanOpen = function() {
  modalActive = true;
  pointsModal.style.display = 'block';
}

const modalCanClose = function(event) {
  if (event.target === pointsModal && modalActive === true) {
    modalActive = false;
    pointsModal.style.display = 'none';
  };
}

const clearChildren = function(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
};

//////////////////////////////////////////////////////////////////
///////////////////////////       Functions in main program
/////////////////////////////////////////////////////////////////

const cardsOpenPointMenuModal = function() {
  const cardContainerNodes = document.getElementsByClassName('point-container');
  
  for (const node of cardContainerNodes) {
    node.addEventListener('click', function(event) {
      // enter [points-menu.js:197] on charcterOrJourneyPointsMenu
      let pointMenuNode = characterOrJourneyPointsMenu(event, node);

      pointMenuNode.style.display = 'block';
      pointMenuNode.classList.add("visible");
      modalCanOpen();
      document.getElementById('modal').addEventListener('click', event => {
        modalCanClose(event);
        unloadPointsMenuNode(pointMenuNode);
        pointMenuNode.style.display = 'none';
        pointMenuNode.classList.remove("visible");
      }, {once:true});
    }); 
  };
};

// const pointMenuCloses = function(event) {
//   const pointMenuNode = document.querySelector('div.points-menu');
//   document.getElementById('modal').removeEventListener('click', pointMenuCloses);
//   modalCanClose(event);
//   unloadPointsMenuNode(pointMenuNode);
//   pointMenuNode.style.display = 'none';
//   pointMenuNode.classList.remove("visible");
// };

const loadMenuResponds = function() {
  document.querySelector('.load-menu.tab.inactive').addEventListener('click', function() {
    if (!modalActive) {
      // enter [load-menu.js:170] on loadMenuOpens()
      loadMenuOpens();
      modalCanOpen();
      document.getElementById('modal').addEventListener('click', loadMenuCloses, {once:true})
    }
  });
}

const saveButtonsSave = function() {
  const characterButton = document.querySelector('div#sidebar form input[type="submit"]');
  const journeyButton = document.querySelector('div#main form input[type="submit"]');
  // enter [save.js:1] on resourceSaves()
  characterButton.addEventListener('click', nonPointResourceButton)
  journeyButton.addEventListener('click', nonPointResourceButton)
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

