//setting up an array of colors
// const COLORS = [
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple",
//   "red",
//   "blue",
//   "green",
//   "orange",
//   "purple"
// ];
const images = [
  "url('https://preview.redd.it/vbmqrwrx1so31.png?width=640&crop=smart&auto=webp&s=9756f78ff3e0abec8588972990600d0ef733c112')",
  "url('https://images-na.ssl-images-amazon.com/images/I/71LJ9CswsSL.png')",
  "url('https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/3261bae433ef54d0870739f5373c30e4-1594133391/Attachment_1594133386/draw-cute-things.png')",
  "url('https://i.ebayimg.com/images/g/vkUAAOSw0Vtec-MQ/s-l300.png')",
  "url('https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-img.instyle.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F276x276%2Fpublic%2Fimages%2F2015%2F11%2F110315-outerwear6.png%3Fitok%3Deh3yqWMT')"
];
//setting up DOM references
const gameContainer = document.getElementById("game");
const scoreboard = document.getElementById('score');
const lowscoreboard = document.getElementById('lowscore');
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

//If no previous records, create some
if(!localStorage.lowestscore){
  localStorage.lowestscore = 28;
  localStorage.lowscorename = 'Bill BetterThanYou';
}
if(localStorage.backgroundColor){
  document.body.style.backgroundColor = localStorage.backgroundColor;
}
//fill out the score board with localStorage info
lowscoreboard.innerText = `Try to beat ${localStorage.lowestscore} set by ${localStorage.lowscorename}`;

function startGame(){
  //resets the score to 0
  curscore = 0;
  //resets the succeful matches to 0
  matches = 0;
  //throws away all the divs
  gameContainer.innerHTML = '';
  //sets the scoreboard to '0 trys'
  scoreboard.innerText = curscore;
  //Makes sure the start buttton is set to it's mid game text 'Re-deal'
  startbutton.value = "Re-deal";
  
  // sets GOAL to how many pairs desired in the deck
  numofpairs = matchesinput.value;

  //reset COLORS to an empty string
  items = [];
  for(let i = 0; i<numofpairs;i++){
   
    
    //let data = randAttributePair();
    let data = [];
    data.value = randomHSL();
    data.key = "backgroundColor";
    data.id = i;

    items.push(data, data);
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
  const s = randomNum(12)+88;
  const l = randomNum(76)+12;
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

//returns an array containing a key attribute and a value attribute
// the key attribute contains the string of what css trait is being edited
// the value attribute contains the string of what the css trait should be changed to.
function randAttributePair(){
  let pair = [];
//picks a random number to pick out the pair to return
  const rand = randomNum(6);
//3 out of 6 times, return a random color
  if (rand >= 0 && rand <= 2){
    pair.value = randomHSL();
    pair.key = 'backgroundColor';
//2 out of 6 times, return a random image
  }else if(rand >= 3 && rand <= 5){
    pair.value = randomImage();
    pair.key = 'backgroundImage';
    //if the pair.value, doesn't exist(likely because the images ran out), set it to a color instead
    if(!pair.value){
      pair.value = randomHSL();
      pair.key = 'backgroundColor';
    }
  //1 out of 6 times, change the border
  }else {
    pair.value = "2px dashed "+randomHSL();
    pair.key = "border";
  }
  return pair;
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
    //If we no cards have been clicked...
    if(!comparables[0]){
      //...set the first index in the comparables array to the current div
      comparables[0] = event.target;
      //..."flip" the card over by setting its color to its classname
      comparables[0].style.backgroundImage = 'none';
      comparables[0].style[comparables[0].dataset.key] = comparables[0].dataset.value;
    //if the first index of comparables is already set check if the next index is set...
    }else if(!comparables[1]){
      //...if its not, check to make sure the second card isn't the same as the first..
      if(comparables[0] != event.target){
        //..if they are two seperate cards, compare them

        //iterate the trys
        curscore++;
        //update the scoreborad
        scoreboard.innerText = curscore;
        //set the second index of comparables with the second, unique, card
        comparables[1] = event.target;
        //"flip" the second card over
        comparables[1].style.backgroundImage = 'none';
        comparables[1].style[comparables[1].dataset.key] = comparables[1].dataset.value;
        //if the two cards class names match...
        if(comparables[0].dataset.id == comparables[1].dataset.id){
          //..iterate the matches variable
          matches++;
          //check if thats all the cards
          if (matches == numofpairs){
            //I had to set a timeout because the alert messages were 
            // for some reason happening before the change in background color happened 
            //up there cause the background color not to change until after you clicked
            //through the alert
            setTimeout(congratulate,300);
          }
          //reset the comparables array so that you can start clicking on cards again
          comparables = [];
          
        //if the cards don't match... 
        }else{ 
          //wait 1000 seconds before resetting the background colors and releasing comparables
          //since comparables is still filled, if you click another card while two wrong ones 
          //are showing, this whole funciton does nothing
          setTimeout(function(){
            comparables[0].style[comparables[0].dataset.key] = '';
            comparables[1].style[comparables[1].dataset.key] = '';
            comparables[0].style.backgroundImage = '';
            comparables[1].style.backgroundImage = '';
            comparables = [];
          },1000);

        }
      } 
    }//if they are both the same card...
    else{
      //...do nothing
    }
  }
}


//when all cards have been flipped
function congratulate(){

  let lowscore = localStorage.lowestscore;
  //If the user has a lower score than the previous low score than save it
  if(lowscore > curscore){
    saveLowScore();
  }
  //otherwise, let them know they won, and ask if they want to start the game again, or look at their cards longer
  else{
    //if they confirm, the game restarts
    if(confirm(`You Won! It took ${curscore} trys to match all the cards! Would you like to try again to beat the low score of ${lowscore}?`)){
      startGame();
    }else{
      //otherwise the "reset cards" text changes to "Restart Game"
      startbutton.value = "Restart Game";
    }
  }

}

//if a new low score needs to be recorded
function saveLowScore(){
  //tell the user and ask for their name
  let lowscorename = prompt(`New Low Score ${curscore}, What name Do want me to put this record under?`,"Major Winner");
  //save the info in localStorage
  localStorage.lowestscore = curscore;
  localStorage.lowscorename = lowscorename;
  //update the low scoreboard
  lowscoreboard.innerText = `Try to beat ${curscore} set by ${lowscorename}`;
}

