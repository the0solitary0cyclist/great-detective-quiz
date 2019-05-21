const questions = [
    {
        question: 'Irene Adler was...',
        options: ['...a French heiress', '...an American opera singer', '...an Italian widow', '...a Greek interpreter', '...a British spy'],
        correctOptionIndex: 1,
    },
    {
        question: 'Which of these women does not appear in the Holmes stories?',
        options: ['Violet Hunter', 'Violet Smith', 'Violet Blackwood', 'Violet de Merville', 'Violet Westbury'],
        correctOptionIndex: 2
    },
    {
        question: 'Which of these is not among Holmes’ many disguises?',
        options: ['An Italian priest', 'An elderly woman', 'A plumber', 'A soliciter', 'A sea captain'],
        correctOptionIndex: 3
    },
    {
        question: 'Which  Sherlock Holmes story takes place on Christmas day?  The Adventure of...',
        options: ['...the Abbey Grange', '...the Three Gables', '...the Noble Bachelor', '...the Blue Carbuncle', '...Black Peter'],
        correctOptionIndex: 3
    },
    {
        question: 'Who never saw Mr. Holmes without a disguise?',
        options: ['The King of Bohemia', 'Irene Adler', 'The Norfolk Builder', 'Mrs. Hudson', 'Professor Moriarty'],
        correctOptionIndex: 1
    },
    {
        question: "In 'A Scandal in Bohemia', Dr. Watson, oddly, refers to his landlady by the name...",
        options: ['...Mrs. Hudson', '...Mrs. Turner', '...The Woman', '...Martha', '...The Red Widow'],
        correctOptionIndex: 1
    },
    {
        question: 'Mr. Holmes and Dr. Watson rent a flat together at the address #221b...',
        options: ['...Baker Street', '...Cherry Tree Lane', '...Winpole Street', '...Dowing Street', '...Marleybone Road'],
        correctOptionIndex: 0
    },
    {
        question: 'Although the stories tell us very little about Mrs. Hudson, her given name is presumed to be...',
        options: ['...Martha', '...Louise', '...Violet', '...Mary', '...Irene'],
        correctOptionIndex: 0
    },
    {
        question: 'What curious thing did the dog do in the nighttime?',
        options: ['It howled', 'It dug up the garden', 'It bit its owner', 'It did nothing', 'It chased an intruder'],
        correctOptionIndex: 3
    },
    {
        question: 'According to Dr. Watson’s early impression of Holmes, Holmes has a profound knowledge of...',
        options: ['...Literature', '...Philosophy', '...Astronomy', '...Politics', '...Chemistry'],
        correctOptionIndex: 4
    }
]

function fisherYatesShuffle(array){
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}

function generateQuiz(array, quizLength){
    return fisherYatesShuffle(array).slice(0, quizLength)
}

const quizLength = 5
let quiz, quizIndex, questionNumber, score, userAnswer

startGame()

function say(text) {
    // var voices = window.speechSynthesis.getVoices()
    // console.log(voices)
    // const utterance = new SpeechSynthesisUtterance(text)
    // utterance.voice = voices.filter(function(voice) { return voice.lang == 'en-GB'; })[0];
    // speechSynthesis.cancel()
    // speechSynthesis.speak(utterance)
    return
}

function resetOutroView() {
    $('#outro-view').hide()
    $('#door-front').removeClass("swing-open")
    $('#view-final-score').hide()
    $('#character-door-frame').removeClass()
    $('#open-door').hide()
    $('#door-status').text('')
    $('#character-response-text').text('')
}

function resetGameView() {
    $('#question').show()
    $('#closed-door').show()
    $('#submit-answer').show()
    $('#next-question').hide()
}

function startGame() {
    quiz = generateQuiz(questions, quizLength)
    resetOutroView()
    resetQuestionForm()
    resetGameView()
    score = 0
    quizIndex = quizLength - 1
    questionNumber = 1
    populateNewQuestion(quiz)
    const questionViewText = `${$('#current-question-number').text()}: ${$('#current-question').text()} ${$('#answer0').text()}, ${$('#answer1').text()}, ${$('#answer2').text()}, ${$('#answer3').text()}, or ${$('#answer4').text()}.`
    say(questionViewText)
}

function populateNewQuestion(quiz) {
    $('#current-question-number').text(`Question ${questionNumber}`)
    $('#current-question').text(quiz[quizIndex]['question'])
    $('#answer0').text(quiz[quizIndex]['options'][0])
    $('#answer1').text(quiz[quizIndex]['options'][1])
    $('#answer2').text(quiz[quizIndex]['options'][2])
    $('#answer3').text(quiz[quizIndex]['options'][3])
    $('#answer4').text(quiz[quizIndex]['options'][4])
}

function strikeIncorrect(correctAnswer) {
    $('label').addClass('incorrect')
    $('input:radio').prop('disabled', true)
    $(`label[for=${correctAnswer}]`).removeClass('incorrect')
    $(`label[for=${correctAnswer}]`).addClass('correct')
}

function resetQuestionForm() {
    $('#question').addClass('asked')
    $('#current-score').text('')
    $('#questions-remaining').text('')
    $('input').prop('checked', false);
    $('label').removeClass('incorrect correct')
    $('input:radio').prop('disabled', false)
    $('#answer-evaluation').text('')
    $('input').attr('aria-checked', false)
    $('.decorative').show()
    userAnswer = undefined
}

function determineCharacter(score) {
    if (score == 0) {
        return 'none'
    } else if (score > 4) {
        return 'holmes'
    } else if (score > 2) {
        return 'watson'
    } else if (score > 0) {
        return 'hudson'
    } else {
        return 'holmes'
    }
}

function characterDisplay(character) {
    $('#character-door-frame').addClass(character)
    switch (character) {
        case 'none':
            $('#door-status').text('It seems no one is at home.')
            break
        case 'hudson':
            $('#character-door-frame').attr('aria-label', 'Mrs. Hudson appears, silhouetted in the doorway.')
            $('#door-status').text('Mrs. Hudson opens the door.')
            $('#character-response-text').text("Mister Holmes is currently engaged in a rather malodorous scientific experiment. You'd best come back again, later.")
            break
        case 'watson':
            $('#character-door-frame').attr('aria-label', 'Dr. Watson appears, silhouetted in the doorway.')
            $('#door-status').text('Dr. Watson opens the door.')
            $('#character-response-text').text('Holmes is scraping upon his violin. Yours may be the case he has been longing for.')
            break
        case 'holmes':
            $('#character-door-frame').attr('aria-label', 'Mr. Holmes appears, silhouetted in the doorway.')
            $('#door-status').text('Mr. Holmes opens the door.')
            $('#character-response-text').text('Hullo! I was badly in need of a case, and this looks, from the state of your shoes, as if it were of importance. Do come inside. The game is afoot!')
            break
    }
}

function encounterCharacter(score) {
    const character = determineCharacter(score)
    characterDisplay(character)
    displayFinalScore(score)
    if (character == 'none') {
        return
    } else {
        $('#closed-door, #open-door').toggle();
        setTimeout(function openDoorRevealCharacter() {
            $('#door-front').addClass("swing-open")
        }, 1100)
    }
}

function displayFinalScore(score) {
    if (score == 5) {
        $('#final-score').text(`You answered all questions correctly.`)
    } else if (score == 1) {
        $('#final-score').text(`You answered 1 question correctly.`)
    } else if (score < 5 && score > 1) {
        $('#final-score').text(`You answered ${score} questions correctly.`)
    } else if (score == 0) {
        $('#final-score').text(`You answered no questions correctly.`)
    } else {
        $('#final-score').text(`Your score is, mysteriously, unavailable.`)
    }
}

function pluralizeCountdown(quizIndex) {
    if (quizIndex == 1) {
        return `1 question remains.`
    } else if (quizIndex == 0) {
        return `That was the final question.`
    } else {
        return `${quizIndex} questions remain.`
    }
}

// Listeners
$('#submit-answer, #next-question').click(function (event) {
    event.preventDefault();
    if (quizIndex == 0) {
        $('#submit-answer, #next-question').hide()
        $('#view-final-score').show()
    } else {
        $('#submit-answer, #next-question').toggle();
    }
})

$('input').click(event => {
    const clickedAnswer = $(event.currentTarget)
    $('input').attr('aria-checked', false)
    clickedAnswer.attr('aria-checked', true)
    // depends on id in html
    userAnswer = $(event.currentTarget).attr('id')
})

$('#submit-answer').click(function () {
    $('#question').addClass('answered')
    const correctAnswerIndex = quiz[quizIndex]['correctOptionIndex']
    const correctAnswerText = quiz[quizIndex]['options'][correctAnswerIndex]
    const questionsRemaining = pluralizeCountdown(quizIndex)

    let answerViewText
    if (userAnswer == correctAnswerIndex) {
        score++
        $('#answer-evaluation').text('Correct')
        // .... adds slight pause
        answerViewText = `Correct. The answer is ${correctAnswerText}....${questionsRemaining}.`
    } else {
        $('#answer-evaluation').text('Incorrect')
        // .... adds slight pause
        answerViewText = `Incorrect. The answer is ${correctAnswerText}....${questionsRemaining}.`

    }
    strikeIncorrect(correctAnswerIndex)
    $('#questions-remaining').text(questionsRemaining)
    $('#answer-view').show()
    $('.decorative').hide()
    say(answerViewText)
})

$('#next-question').click(function () {
    quizIndex--
    questionNumber++
    populateNewQuestion(quiz)
    resetQuestionForm()
    const questionViewText = `${$('#current-question-number').text()}: ${$('#current-question').text()} ${$('#answer0').text()}, ${$('#answer1').text()}, ${$('#answer2').text()}, ${$('#answer3').text()}, or ${$('#answer4').text()}?`
    say(questionViewText)
})

$('#view-final-score').click(function () {
    event.preventDefault();
    $('#question, #outro-view').toggle();
    encounterCharacter(score)
    $('.decorative').show()
    const outroText = $('#outro-text').text()
    say(`${outroText}. Click the button to play again.`)
})

$('.reset').click(function () {
    startGame()
})

$('.answered').on('keypress', '*', function (event) {
    event.preventDefault()
    console.log('captured')
    if (event.which == 13) {
        $('#next-question').click
    }
})