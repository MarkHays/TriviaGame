// first we will make our start button get removed upon user click.
$('#start').on('click', function () {
    $('#start').remove();
    game.loadQuestion();
})
$(document).on('click', '.answer-button', function (e) {
    game.clicked(e);
})

$(document).on('click', '#reset', function () {
    game.reset();
})
// next we set our questions
var questions = [{
    question: "What falling fruit supposedly inspired Isaac Newton to write the laws of gravity? ",
    answers: ["Pear", "Orange", "Apple", "Coconut"],
    correctAnswer: "Apple",
    image: "assets/images/apple.gif"
}, {
    question: " Which TV character said, “Live long and prosper”?",
    answers: ["Hank Hill from King of The Hill", "Mr. Spock from Star Trek", "Sheldon Cooper from The Big Bang Theory", "Chandler Bing from Friends"],
    correctAnswer: "Mr. Spock from Star Trek",
    image: "assets/images/mrSpockGif.gif"

}, {
    question: "what was the first full length CGI movie?",
    answers: ["A Bug's Life", "Monsters Inc.", "Toy Story", "The Lion King"],
    correctAnswer: "Toy Story",
    image: "assets/images/toystory.gif"
}, {
    question: "How many planets are in the solar system?",
    answers: ["9", "8", "7", "10"],
    correctAnswer: "8",
    image: "assets/images/number8Gif.gif"
}, {
    question: "How old is the earth?",
    answers: ["Around 2 million years", "Around 4.5 million years", "Around 2 billion years", "Around 17 thousand years"],
    correctAnswer: "Around 4.5 million years",
    image: "assets/images/earth.gif"
}, {
    question: "What’s the most malleable metal?",
    answers: ["Aluminium", "Silver", "Steel", "Gold"],
    correctAnswer: "Gold",
    image: "assets/images/gold.gif"
}, {
    question: "What is the most widely eaten fish in the world?",
    answers: ["Herring", "Tuna", "Salmon", "Catfish"],
    correctAnswer: "Herring",
    image: "assets/images/herring.gif"

}];

// Game Object

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function () {
        game.counter--;
        $('#counter').html(game.counter);
        if (game.counter <= 0) {
            console.log("TIME UP!");
            game.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        $('#subwrapper').html("<h2>TIME LEFT <span id='counter'>30</span> Seconds</h2>");
        $('#subwrapper').append('<h2>' + questions[game.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            $('#subwrapper').append('<button class="answer-button" id="button-' + i + '" data-name="' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function () {
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function () {
        clearInterval(timer);
        game.unanswered++;
        $('#subwrapper').html('<h2>OUT OF TIME!</2>');
        $('#subwrapper').append('<h3>The Correct Answer Was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function () {
        clearInterval(timer);
        $('#subwrapper').html("<h2>Your Results</h2>");
        $('#subwrapper').append("<h3>Correct: " + game.correct + "</h3>");
        $('#subwrapper').append("<h3>Incorrect: " + game.incorrect + "</h3>");
        $('#subwrapper').append("<h3>Unanswered: " + game.unanswered + "</h3>");
        $('#subwrapper').append("<button id='reset'>RESET</button>")
    },
    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();

        }
        else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function () {
        console.log("You Got It!!!");
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>YOU GOT IT RIGHT!</h2>');
        //$('#subwrapper').append('<img class="loadergif" src="../assets/apple.gif" width="" height="">');

        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredIncorrectly: function () {
        console.log("WRONG!!!");
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>YOU GOT IT WRONG!</h2>');
        $('#subwrapper').append('<h3>The Correct Answer Was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function () {
        game.currentQuestion = 0;
        game.counter = 30;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();


    }
}