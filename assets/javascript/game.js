function generateWord() {
    //generate a word in ramdom
    var words = [
        "daisy",
        "donald",
        "winnie",
        "micky"
    ];

    var wordPosition = Math.floor(Math.random() * words.length);
    var word = words[wordPosition];
    console.log("generating a new word", word);
    return word;
}

function displayWord(word, letterGuessed) {
    var displayText = '';

    // for each character in the word,
    for(var i = 0; i < word.length; i++) {
        // we check if the character in the letter guessed array.
        if ( letterGuessed.indexOf(word[i]) !== -1 ) {
            // if the character was guessed, we unmask it.
            displayText += " " + word[i];
        } else {
            // otherwise, show a underscore for it.
            displayText += " _";
        }
    }
    return displayText;
}

function game() {
    var winCountElement = document.getElementById('winCount');
    var wordDisplayElement = document.getElementById('wordDisplay');
    var guessRemainingElement = document.getElementById('guessRemaining');
    var letterGuessedElement = document.getElementById('letterGuessed');

     //initialize
    var winCount = 0;
    var guessRemaining = 5;
    var letterGuessed = [];

    // generate a word from the array
    var word = generateWord();

    // put the counter values to DOM Elements.
    winCountElement.textContent = winCount;
    guessRemainingElement.textContent = guessRemaining;
    letterGuessedElement.textContent = letterGuessed;
    wordDisplayElement.textContent = displayWord(word, letterGuessed);
    // provide the player with a way to guess what the letter is
    document.addEventListener('keydown', function(event) {
        var guessLetter = event.key.toLowerCase(); // the player's guess
        console.log('keydown event\n\n' + 'key: ' + guessLetter);

        // if this letter was guessed, ignore it.
        if (letterGuessed.indexOf(guessLetter) !== -1) {
            return;
        }
        // put the letter to the array of letter guessed
        letterGuessed.push(guessLetter);

        // update the word display with the new guess
        wordDisplayElement.textContent = displayWord(word, letterGuessed);  
        
        // if this newly guessed letter is guess correctly
        if(word.indexOf(guessLetter) !== -1) {
            // if there are no more underscore in the word display
            if(wordDisplayElement.textContent.indexOf('_') === -1) {
               // increment win count and reset everything. 
                winCount += 1;
                guessRemaining = 5;
                guessRemainingElement.textContent = guessRemaining;
                letterGuessed = [];
                word = generateWord();
            }
        } else {
            // if the guess is incorrect

            // if there are no guess remaining, 
            if(guessRemaining === 0) {
                // reset everything and print Game over
                guessRemaining = 5;
                guessRemainingElement.textContent = "Game over";
                letterGuessed = [];
                word = generateWord();
            } else {
                // decrement guess remaining by 1
                guessRemaining -= 1;
                guessRemainingElement.textContent = guessRemaining;
            }
        }

        // re-render the counter to DOM Elements
        winCountElement.textContent = winCount;
        letterGuessedElement.textContent = letterGuessed;
        wordDisplayElement.textContent = displayWord(word, letterGuessed);  
    });
}

// start the game
game();