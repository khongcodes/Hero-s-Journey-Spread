
// Pull card image based on api
fetch('http://localhost:3000/cards/1')
.then(resp => resp.json())
.then(obj => function() {
	let card1 = document.createElement('img');
	card1.src = `assets/card-images/${obj.card_type}/${obj.value}.jpg`;
	document.body.appendChild(card1);
}());
