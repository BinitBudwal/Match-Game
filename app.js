/* 
Requirements:
-Card should match with left side Single card.
-HTML & CSS will be required to be modified.
1-Shuffles & Hide randomly on start and reset.
2-Click on card reveal it.
3-One click at a time 
4-Should not be able to open already opened card.
5-If card not matched hide it again (set timeout).
6-Win on if all the cards matchs .
7-On winning give alert "You Won", number of moves it took.
8-Reset Button , reset game with hidden & shuffeled cards and moves set to zero.
9-Actively track user move count.

Counters:
-number of moves.


*/

var nextCard=["atom","frog","feather","cogs","anchor","fan","bolt","wizard","apple","bell","bomb","brain",];

let card= document.getElementsByClassName("card");
let cards= [...card];

const deck = document.getElementById("cardDeck");

let moves = 0;
let counter= document.querySelector(".score");

var iconarray =["fa-anchor","fa-atom","fa-frog","fa-feather-alt","fa-cogs","fa-fan","fa-bolt","fa-hat-wizard","fa-apple-alt","fa-bell","fa-bomb","fa-brain"];

let icon= document.querySelector(".nextCard");
let IconClassName =  document.querySelector(".nextCard").children[0].classList; // the current icon


let matchedCard = document.getElementsByClassName("matched");



var openedCards = [];


// Shuffle function from http://stackoverflow.com/a/2450976
let shuffle = function(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


document.body.onload= startGame();

function startGame(){
  openedCards= [];
  cards=shuffle(cards);

  for (var i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function (item) {
      deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "matched", "disabled");
  }

  nextCard=["anchor","atom","frog","feather","cogs","fan","bolt","wizard","apple","bell","bomb","brain",];

  iconarray =["fa-anchor","fa-atom","fa-frog","fa-feather-alt","fa-cogs","fa-fan","fa-bolt","fa-hat-wizard","fa-apple-alt","fa-bell","fa-bomb","fa-brain"];
  IconClassName =  document.querySelector(".nextCard").children[0].classList; // the current icon
  IconClassName[1].replace('fa-anchor');

  moves = 0;
  counter.innerHTML = moves;

}


var displayCard = function () {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};


function cardOpen() {
  openedCards.push(this);
  var len = openedCards.length;
  if (len === 1) {
    moveCounter();
    if (openedCards[0].type === nextCard[0]) {
      matched();

    } else {
      unmatched();
    }
  }
}


function matched() {

  openedCards[0].classList.add("matched", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
 
  iconarray.shift(); // remove the first element inside iconarray
  IconClassName =  document.querySelector(".nextCard").children[0].classList; // the current icon
  IconClassName.remove(IconClassName[1]);
  IconClassName.add(iconarray[0]);

  nextCard.shift(); 
  openedCards = [];
}


function unmatched() {
  openedCards[0].classList.add("unmatched");
  disable();
  setTimeout(function () {
    openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
    enable();
    openedCards = [];
  }, 1100);
}


function disable() {
  Array.prototype.filter.call(cards, function (card) {
    card.classList.add("disabled");
  });
}


function enable() {
  Array.prototype.filter.call(cards, function (card) {
    card.classList.remove("disabled");
    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}



function moveCounter() {
  moves++;
  counter.innerHTML = moves;
}


function congratulations() {
  if (matchedCard.length == 12) {
    
    document.getElementsByClassName(".score").innerHTML = moves;
    
    alert("Congratulation you won , "+" You took = "+moves+" moves ");
  }

}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congratulations);
}