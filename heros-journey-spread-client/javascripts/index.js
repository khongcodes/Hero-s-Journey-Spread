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
  cardsOpenPointMenuModal();
  loadMenuResponds();

});

//////////////////////////////////////////////////////////////////
///////////////////////////       Utilities
/////////////////////////////////////////////////////////////////

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
      });
    }); 
  };
};

const loadMenuResponds = function() {
  document.querySelector('.load-menu.tab.inactive').addEventListener('click', function() {
    if (!modalActive) {
      // enter [load-menu.js:1] on loadMenuOpens()
    loadMenuOpens();

    modalCanOpen();
    document.getElementById('modal').addEventListener('click', event => {
      modalCanClose(event);
      loadMenuCloses();
    })
    }
  });
}

const loadMenuTabResponds = function() {
  
}




