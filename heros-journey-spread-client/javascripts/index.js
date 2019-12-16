const BASE_URL = 'http://localhost:3000';
const GET_CARD = `${BASE_URL}/cards`;
const RANDOM_CARD = `${GET_CARD}/random/1`;
const RANDOM_THREE = `${GET_CARD}/random/3`;

let modalActive = false;
let journeyPersisted = false;
let characterPersisted = false;
const pointsModal = document.querySelector('div#modal');

const pointState = {
  journey: {
    // point0: {
    //   cards: [
    //     {id:45, state:'upright'},
    //     {id:26, state:'inverted'}
    //   ],
    //   description: "user inputted text"
    // },
    point1: {
      cards: [],
      description: "",
    },
    point2: {
      cards: [],
      description: "",
    },
    point3: {
      cards: [],
      description: "",
    },
    point4: {
      cards: [],
      description: "",
    },
    point5: {
      cards: [],
      description: "",
    },
    point6: {
      cards: [],
      description: "",
    },
    point7: {
      cards: [],
      description: "",
    },
    point8: {
      cards: [],
      description: "",
    },
    point9: {
      cards: [],
      description: "",
    },
    point10: {
      cards: [],
      description: "",
    },
    point11: {
      cards: [],
      description: "",
    },
    point12: {
      cards: [],
      description: "",
    }
  },
  character: {
    p1: {
      cards: [],
      description: "",
    },
    p2: {
      cards: [],
      description: "",
    },
    p3: {
      cards: [],
      description: "",
    },
    p4: {
      cards: [],
      description: "",
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // handlePointStateOnIndex();
  cardsOpenPointMenuModal();

});

const handlePointStateOnIndex = function() {
  // handleif journey is loaded
  const pointContainerNodes = document.getElementsByClassName('point-container');
  for (const node of pointContainerNodes ) {
    // switch (getPointStage(node)){
    //   case 'stage1':
    //     node.querySelector('img').src = 'assets/card-images/x-small.jpg';
    //     break;
    //   case 'stage2':
    //     break;
    //   case 'stage3':
    //     break;
    // }
  }
}

const cardsOpenPointMenuModal = function() {
  const cardContainerNodes = document.getElementsByClassName('point-container');
  
  for (const node of cardContainerNodes) {
    node.addEventListener('click', function(event) {
      let pointMenuNode = characterOrJourneyPointsMenu(event, node);
      modalCanOpen(pointMenuNode);
      document.getElementById('modal').addEventListener('click', event => {
        modalCanClose(event, node);
      });
    }); 
  };
};

const modalCanOpen = function(pointMenuNode) {
  modalActive = true;
  pointsModal.style.display = 'block';
  pointMenuNode.style.display = 'block';
  pointMenuNode.classList.add("visible");
}

const modalCanClose = function(event) {
  if (event.target === pointsModal && modalActive === true) {
    modalActive = false;
    
    let pointMenuNode = document.querySelector('.points-menu');
    unloadMenuNode(pointMenuNode);
    pointMenuNode.style.display = 'none';
    pointMenuNode.classList.remove("visible");
    pointsModal.style.display = 'none';
  };
}

const characterOrJourneyPointsMenu = function(event, nodeClicked) {
  let pointMenuNode = document.querySelector('div.points-menu');
  if ([...event.target.classList].includes('character')) {;
    pointMenuNode.classList.add('character', nodeClicked.classList[2])
    loadCharacterPointContent(pointMenuNode, nodeClicked);
  } else {
    console.log(nodeClicked.classList[2])
    // add current point to classList of menu so eventhandler can know what point to reference
    pointMenuNode.classList.add('journey', nodeClicked.classList[2])
    loadJourneyPointContent(pointMenuNode, nodeClicked);
  };
  return pointMenuNode;
};

const unloadMenuNode = function(menu) {
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

const clearChildren = function(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
};






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
