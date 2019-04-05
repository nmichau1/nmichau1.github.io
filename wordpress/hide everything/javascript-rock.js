


var userChoice = "";
   document.getElementById('rock').onclick =
    function(){
              robot ();
              userChoice="rock"
              console.log(userChoice);
              compare (userChoice, computerChoice);
 }
 document.getElementById('paper').onclick =
   function(){
              robot ();
              userChoice="paper"
              console.log(userChoice);
              compare (userChoice, computerChoice);
 }
 document.getElementById('scissors').onclick =
   function(){
              robot ();
              userChoice="scissors"
              console.log(userChoice);
              compare (userChoice, computerChoice);
 }
 var winCounter =1;
 var loseCounter =1;
 var computerChoice;

  function robot(){

      computerChoice = Math.random();

  if(computerChoice <.34) {
      computerChoice = "rock"

} else if(computerChoice <= 0.67) {
      computerChoice = "paper";

} else {
    computerChoice = "scissors";

} console.log("Computer: " + computerChoice);
}

var compare = function(choice1, choice2) {
 if (choice1 === choice2) {
   document.getElementById('results').innerHTML ="Tie Game!";
  }

  else if (choice1 === "rock" && choice2 === "scissors") {
     document.getElementById('results').innerHTML ="Computer Chose Scissors so You Win!";
     document.getElementById('player-score').innerHTML = winCounter++;
   }
   else if (choice1 === "rock" && choice2 === "paper") {
     document.getElementById('results').innerHTML =" Computer Chose Paper so You Lose!";
     document.getElementById('computer-score').innerHTML = loseCounter++;
    }
   else if(choice1 === "paper" && choice2 === "rock") {
      document.getElementById('results').innerHTML =" Computer Chose Rock so You Win!";
       document.getElementById('player-score').innerHTML = winCounter++;
    }
   else if(choice1 === "paper" && choice2 === "scissors") {
       document.getElementById('results').innerHTML =" Computer Chose Scissors so You Lose!";
       document.getElementById('computer-score').innerHTML = loseCounter++
      }
    else if(choice1 === "scissors" && choice2 === "paper") {
        document.getElementById('results').innerHTML =" Computer Chose Paper so You Win!";
         document.getElementById('player-score').innerHTML = winCounter++;
      }
    else if(choice1 === "scissors" && choice2 === "rock") {
        document.getElementById('results').innerHTML =" Computer Chose Rock so You Lose!";
        document.getElementById('computer-score').innerHTML = loseCounter++;
        }

}
