const RANDOM_CARD = 'http://localhost:3000/random/1';
let modalActive = false;
const pointsModal = document.querySelector('div#modal');

document.addEventListener('DOMContentLoaded', () => {
  cardsOpenPointMenuModal();
  cardsInPointCanDraw();
});

const cardsOpenPointMenuModal = function() {
  const cardContainerNodes = document.getElementsByClassName('point-container');
  
  for (const node of cardContainerNodes) {
    node.addEventListener('click', function(event) {
      modalCanOpen(event);
      window.addEventListener('click', function(event) {
        modalCanClose(event);
      });
    });
  };
};

function modalCanOpen(event) {
  modalActive = true;
  const pointContent = characterOrJourneyPointsMenu(event);
  pointsModal.style.display = 'block';
  pointContent.style.display = 'block';
}

function modalCanClose(event) {
  if (event.target === pointsModal && modalActive === true) {
    modalActive = false;
    pointsModal.style.display = 'none';
    pointContent.style.display = 'none';
  }
}

function characterOrJourneyPointsMenu(event) {
  let pointContentContainer;
  if ([...event.target.classList].includes('character')) {
    pointContentContainer = document.querySelector('div.points-menu.character');
  } else {
    pointContentContainer = document.querySelector('div.points-menu.journey');
  };
  return pointContentContainer;
};

const cardsInPointCanDraw = function() {
  document.querySelector('div.point-card-container .draw-card').addEventListener('click', function() {
    return console.log('big bluh')
  })
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
