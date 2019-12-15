const RANDOM_CARD = 'http://localhost:3000/random/1';
let modalActive = false;
const pointsModal = document.querySelector('div#modal');

// class IndexPoints {
//   constructor(pointNum, stage=1, card=undefined, querentRef='' ) {
//     this.pointNum = pointNum;
//     this.stage = stage;
//     this.cards = card;
//     this.querentRef = querentRef;
//   }
// }

document.addEventListener('DOMContentLoaded', () => {
  // preparePointObjects();
  cardsOpenPointMenuModal();
  cardsInPointCanDraw();
});

// const preparePointObjects = function() {
//   const pointContainerNodes = document.getElementsByClassName('point-container');
//   for (const node of cardContainerNodes ) {
//     const 
//   }
// }

const cardsOpenPointMenuModal = function() {
  const cardContainerNodes = document.getElementsByClassName('point-container');
  
  for (const node of cardContainerNodes) {
    node.addEventListener('click', function(event) {
      let pointMenuNode = characterOrJourneyPointsMenu(event, node);
      modalCanOpen(event, pointMenuNode);
      document.getElementById('modal').addEventListener('click', event => {
        modalCanClose(event);
      });
    }); 
  };
};

const modalCanOpen = function(event, pointMenuNode) {
  modalActive = true;
  pointsModal.style.display = 'block';
  pointMenuNode.style.display = 'block';
  pointMenuNode.classList.add("visible");
}

const modalCanClose = function(event) {
  if (event.target === pointsModal && modalActive === true) {
    modalActive = false;
    
    let pointMenuNode = document.querySelector('.points-menu.visible');
    unloadMenuNode(pointMenuNode);
    pointMenuNode.style.display = 'none';
    pointMenuNode.classList.remove("visible");
    pointsModal.style.display = 'none';
  };
}

const characterOrJourneyPointsMenu = function(event, nodeClicked) {
  let pointMenuNode;
  if ([...event.target.classList].includes('character')) {
    pointMenuNode = document.querySelector('div.points-menu.character');
    loadCharacterPointContent(pointMenuNode, nodeClicked);
  } else {
    pointMenuNode = document.querySelector('div.points-menu.journey');
    loadJourneyPointContent(pointMenuNode, nodeClicked);
  };
  return pointMenuNode;
};

const unloadMenuNode = function(menu) {
  if ([...menu.classList].includes('character')) {

  } else {
    document.querySelector('h2.points-menu.header-content').innerText = "";
    document.querySelector('p.points-menu.info-content').innerText = ""
  }
}

const loadCharacterPointContent = function(pointMenuNode, nodeClicked) {
  console.log(nodeClicked);
}





// Pull card image based on api
// fetch('http://localhost:3000/cards/random/1')
// .then(resp => resp.json())
// .then(obj => function() {
// 	let card1 = document.createElement('img');
//   if (obj[0].card_type === 'major') {
//     card1.src = `assets/card-images/${obj[0].card_type}/${obj[0].value}.jpg`;
//   } else {
//     card1.src = `assets/card-images/${obj[0].card_type}/${obj[0].suit}/${obj[0].value}.jpg`;
//   }
  
// 	document.body.appendChild(card1);
// }());
