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

function startQuiz() {//creates timer
    timer = 75;
    var x = setInterval(() => {//sets a one second interval
        if (score > -1) {
            clearInterval(x);//stops timer
        }
        timer--;
        document.getElementById("timer").innerHTML = "Timer:  " + timer;//writes timer to screen
        if (timer <= 0) {
            endGame();
            clearInterval(x);//stops timer
        }
    }, 1000);//sets coutdown interval

    next();//displays next question
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

    //var newHtml = "<h1>" + questions[curIndex].question + "</h1>";//inserts question text

    var newHtml = document.createElement("h1");// replaced syntax on line 67
    newHtml.innerHTML = questions[curIndex].question;
    var curChoices = questions[curIndex].choices;
    newDiv.appendChild(newHtml);

    for(var loopCounter = 0; loopCounter < curChoices.length; loopCounter++) {//for loop creates choice buttons
        
        var choiceButton = document.createElement("button");//creates button
        choiceButton.innerHTML = curChoices[loopCounter];//creates text for button
        
        if (curChoices[loopCounter] === questions[curIndex].answer){
            choiceButton.setAttribute("onclick", "correct()");//calls correct function if answer is correct

        } else {choiceButton.setAttribute("onclick", "wrong()");//calls  wrong function is answer is incorrect

        }
        var breakLine = document.createElement("br");
        newDiv.appendChild(choiceButton);
        newDiv.appendChild(breakLine);//makes buttons verticle
    }

    var horRow = document.createElement("hr");
    newDiv.appendChild(horRow);//creates horizontal line to showcase whether the previous answer was correct or incorrect
    newDiv.append(preAnswer);
    
    contentArea.parentNode.replaceChild(newDiv, contentArea);//replaces previous content
};

function correct() {//what to do the correct answer is chosen
    preAnswer = "Correct!"; 
    next();
}

function wrong() {//what to do when incorrect answer is chosen
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

    var overGame = document.createElement("h1");//127 - 154 replaced syntax from commented code above
    overGame.innerHTML = "All Done!";//write to screen when quiz is done
    newDiv.appendChild(overGame);
    
    var finalScore = document.createElement("p");//writes to screen the final score
    finalScore.innerHTML ="Your final score is " + score + "!";
    newDiv.appendChild(finalScore);

    var endForm = document.createElement("form");//creates form for submit button

    var endLabel = document.createElement("label");
    endLabel.setAttribute("for", "initials");//creates label to enter player initials
    endLabel.innerHTML = "Enter Initials ";
    
    var endInput = document.createElement("input");
    endInput.setAttribute("type", "text");
    endInput.setAttribute("id", "initials");//creates input element to enter initials
    endInput.setAttribute("name", "initials");

    var endButton = document.createElement("button");//creates the submit button
    endButton.innerHTML = "Submit ";

    endForm.appendChild(endLabel);//add label to form
    endForm.appendChild(endInput);//add input to form
    endForm.appendChild(endButton);//add button to form
    newDiv.appendChild(endForm);//add form to div

    contentArea.parentNode.replaceChild(newDiv, contentArea);//replaces previous content
    }
}