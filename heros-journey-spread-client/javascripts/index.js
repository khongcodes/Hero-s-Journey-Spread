const RANDOM_CARD = 'http://localhost:3000/random/1'



document.addEventListener('DOMContentLoaded', () => {
  cardOpensPointsMenu();
});

const journeyCardsOpenPointMenu = function() {
  const cardContainerNodes = document.getElementsByClassName('journey-point-container');
  for (const node of cardContainerNodes) {
    node.addEventListener('click', function() {
      
    })
  }
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
