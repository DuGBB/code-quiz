//setting variables
var timer;
var curIndex = -1;
var preAnswer = "";
var score = -50;
//quiz questions, available choices, and correst answers array
var questions = [{
    question: "Commonly used data types DO Not Include",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts"
    },
    {
    question: "The condition in an if / else statement is enclosed with ______",
    choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
    answer: "3. parenthesis"
    },  
    {
    question: "Arrays in JavaScript can be used to store _____",
    choices: ["1. numbers", "2. other arrays", "3. booleans", "4. all of the above"],
    answer: "4. all of the above"
    },  
    {
    question: "String values must be enclosed within _____ when being assigned to variables",
    choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
    answer: "3. quotes"
    },   
    {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
    answer: "4. console.log"
    }
];

function startQuiz() {
    timer = 75;
    var x = setInterval(() => {
        if (score > -1) {
            clearInterval(x);
        }
        timer--;
        document.getElementById("timer").innerHTML = "Timer:  " + timer;
        if (timer <= 0) {
            console.log('TIMERWORKS?');
            endGame();
            clearInterval(x);
        }
    }, 1000);

    next();
};

//displays the question
function next() {
    curIndex++;//increments it up from -1

    if (curIndex > questions.length - 1) {
       //logging that endgame work

    endGame();
    return 0;
    };

    var contentArea = document.getElementById("content");//grabbing div
    var newDiv = document.createElement("div");//creates new content div
    newDiv.setAttribute("id", "content");//save stylings

    var newHtml = "<h1>" + questions[curIndex].question + "</h1>";//inserts question text
    var curChoices = questions[curIndex].choices;

    for(var loopCounter = 0; loopCounter < curChoices.length; loopCounter++) {
        
        if (curChoices[loopCounter] === questions[curIndex].answer){
            newHtml = newHtml + "<button onclick=\"correct()\">" + curChoices[loopCounter] + "</button><br/>";
        } else {newHtml = newHtml + "<button onclick=\"wrong()\">" + curChoices[loopCounter] + "</button><br/>";

        }
    }
    newHtml = newHtml + "<hr>";
    newHtml = newHtml + preAnswer;
    newDiv.innerHTML = newHtml;

    
    contentArea.parentNode.replaceChild(newDiv, contentArea);//replaces previous content
};

function correct() {
    preAnswer = "Correct!"; 
    next();
}

function wrong() {
    preAnswer = "Wrong!";
    timer = timer - 10;
    next();
}

function endGame() {
    if(score < 0) {
    score = timer; 
    var contentArea = document.getElementById("content");//grabbing div
    var newDiv = document.createElement("div");//creates new content div
    newDiv.setAttribute("id", "content");//save stylings
    
    //More To Come

    /*var endHtml = "<h1>All done!</h1>";

    endHtml = endHtml + "<p>Your final score is " + score + "!</p>";  
    endHtml = endHtml + "<form><label for=\"initials\">Enter Initials:</label>";
    endHtml = endHtml + "<input type=\"text\" id=\"initials\" name=\"initials\">";
    endHtml = endHtml + "<button>Subnit</button></form>";
    
    newDiv.innerHTML = endHtml;
        */

    var overGame = document.createElement("h1");
    overGame.innerHTML = "All Done!";
    newDiv.appendChild(overGame);
    
    var finalScore = document.createElement("p");
    finalScore.innerHTML ="Your final score is " + score + "!";
    newDiv.appendChild(finalScore);

    var endForm = document.createElement("form");

    var endLabel = document.createElement("label");
    endLabel.setAttribute("for", "initials");
    endLabel.innerHTML = "Enter Initials ";
    
    var endInput = document.createElement("input");
    endInput.setAttribute("type", "text");
    endInput.setAttribute("id", "initials");
    endInput.setAttribute("name", "initials");

    var endButton = document.createElement("button");
    endButton.innerHTML = "Submit ";

    endForm.appendChild(endLabel);
    endForm.appendChild(endInput);
    endForm.appendChild(endButton);
    newDiv.appendChild(endForm);

    contentArea.parentNode.replaceChild(newDiv, contentArea);//replaces previous content
    }
}