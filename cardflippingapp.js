
// const images = [
//   "url('https://preview.redd.it/vbmqrwrx1so31.png?width=640&crop=smart&auto=webp&s=9756f78ff3e0abec8588972990600d0ef733c112')",
//   "url('https://images-na.ssl-images-amazon.com/images/I/71LJ9CswsSL.png')",
//   "url('https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/3261bae433ef54d0870739f5373c30e4-1594133391/Attachment_1594133386/draw-cute-things.png')",
//   "url('https://i.ebayimg.com/images/g/vkUAAOSw0Vtec-MQ/s-l300.png')",
//   "url('https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-img.instyle.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F276x276%2Fpublic%2Fimages%2F2015%2F11%2F110315-outerwear6.png%3Fitok%3Deh3yqWMT')"
// ];
//setting up DOM references
const gameContainer = document.getElementById("game");
const startbutton = document.querySelector('#start');
const form = document.getElementById('form');
const matchesinput = document.querySelector('#matches');
const expertmodebutton = document.getElementById('expertMode');

//click the start button to start the game
startbutton.addEventListener("click", startGame);
form.addEventListener("submit", function(e){
  e.preventDefault();
  startGame();
})

expertmodebutton.addEventListener('click', enterExpertMode);

function enterExpertMode(){
  document.addEventListener("mousemove", bodyColorFromMouse);
  expertmodebutton.innerText = "Double Click Anywhere to Save Color";
  expertmodebutton.removeEventListener('click',enterExpertMode);
  expertmodebutton.addEventListener('click',leaveExpertMode);
  document.addEventListener('dblclick',leaveExpertMode);
}
function leaveExpertMode(){
  document.removeEventListener("mousemove", bodyColorFromMouse);
  expertmodebutton.innerText = "Enter Expert Mode";
  expertmodebutton.removeEventListener('click',leaveExpertMode);
  document.removeEventListener('dblclick',leaveExpertMode);
  expertmodebutton.addEventListener('click',enterExpertMode);
  localStorage.backgroundColor = document.body.style.backgroundColor;
}
//setting up variables
let comparables = [];
let curscore = 0;
let matched = 0;
let numofpairs = 5;
let items=[];
let key = 'backgroundColor';


if(localStorage.backgroundColor){
  document.body.style.backgroundColor = localStorage.backgroundColor;
}
function startGame(){
  //resets the score to 0
  curscore = 0;
  //resets the succeful matches to 0
  matches = 0;

  //throws away all the divs
  gameContainer.innerHTML = '';
  //Makes sure the start buttton is set to it's mid game text 'Re-deal'
  startbutton.value = "Re-deal";
  
  // sets GOAL to how many pairs desired in the deck
  numofcards = matchesinput.value;

  //reset COLORS to an empty string
  items = [];
  for(let i = 0; i<numofcards;i++){
   
    //let data = randAttributePair();
    let data = [];
    data.value = randomHSL();
    data.key = "backgroundColor";
    data.id = i;

    items.push(data);
}


  // when the DOM loads
  createDivsWithData(shuffle(items));

}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

//this function returns a random, valid, HSL string ex hsl(200,75%,57%)
function randomHSL(){
  const h = randomNum(255);
  const s = 80;
  const l = 56;
  return `hsl(${h},${s}%,${l}%)`;
}

//pops of an image from the images array above
function randomImage(){
  return images.pop();
}

//returns a whole number between 0 and max
function randomNum(max){
  return Math.floor(Math.random()*(max+1));
}


//This function loops over the array of data
// it creates a new div and gives it data-value,key, and id 
// attributes based on the data in dataArray 
// it also adds an event listener for a click for each card
function createDivsWithData(dataArray) {
  for (let data of dataArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a data attribute for the value we are looping over
    newDiv.dataset.value = data.value;
    newDiv.dataset.key = data.key;
    newDiv.dataset.id = data.id;
    

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

//When someone clicks on a card
function handleCardClick(event) {
  //only run this code if the card is not already flipped
  if(event.target.style.backgroundColor == ''){
    const clicked = event.target;
    clicked.style[clicked.dataset.key] = clicked.dataset.value;
    clicked.style.backgroundImage = 'none';
  }else{
      //...do nothing
    }
}



