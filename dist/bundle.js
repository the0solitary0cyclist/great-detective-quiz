/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quiz__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gameHelpers__ = __webpack_require__(2);



function main() {

  function userGameClass() {
    var _state = {
      scoreArray: [],
      currentScore: 0,
      userAnswer: undefined
    }
    this.setUserAnswer = function (userAnswer) {
      _state.userAnswer = userAnswer
    }
    this.getUserAnswer = function () {
      return _state.userAnswer
    }
  }

  var userGameClassInstance = new userGameClass()

  let scoreArray = []
  let currentScore
  let userAnswer

  let counter = __WEBPACK_IMPORTED_MODULE_0__quiz__["a" /* quiz */].length

  function newQuestion(counter, quiz) {
    console.log('question number', counter)
    var i = counter - 1
    var count = quiz.length - counter + 1
    $('#count').text(`Question ${count}`)
    $('#question').append(`<h3 class="question${i}" question">${quiz[i]['q']}</h3>`)
    $('#answer0').text(quiz[i]['s'][0])
    $('#answer1').text(quiz[i]['s'][1])
    $('#answer2').text(quiz[i]['s'][2])
    $('#answer3').text(quiz[i]['s'][3])
    $('#answer4').text(quiz[i]['s'][4])
  }


  function verifyUserAnswer(correctAnswer) {
    const userAnswer = userGameClassInstance.getUserAnswer()
    if (userAnswer == correctAnswer) {
      return true
    } else {
      return false
    }
  }

  function cleanUpPrevious() {
    $('input:radio').attr('checked', false)
    $('#question').children('h3').hide()
    $('label').removeClass('incorrect')
    $('label').removeClass('correct')
    $('input:radio').show()
    $('#next-question').hide()
  }

  function strikeIncorrect(correctAnswer) {
    $('legend').hide()
    $('label').addClass('incorrect')
    $(`label[for=${correctAnswer}]`).removeClass('incorrect')
    $(`label[for=${correctAnswer}]`).addClass('correct')
    $('input:radio').hide()
    $('#submit-answer').hide()
    if (counter == 1) {
      $('#submit-answer').hide()
      $('#next-question').hide()
      $('#view-final-score').show()
    } else {
      $('#next-question').show()
    }
  }


  //getView helper functions


  function getQuestionView(counter) {
    if (counter >= 0) {
      $('.door-frame').hide()
      $('#play-view').show()
      $('legend').show()
      $('#intro-view').hide()
      $('#outro-view').hide()
      cleanUpPrevious()
      $('#submit-answer').show()
      newQuestion(counter, __WEBPACK_IMPORTED_MODULE_0__quiz__["a" /* quiz */])
    } else {
      console.log('now is not the time for a new Q')
    }
  }

  function getAnswerView(truthiness, correctAnswer, currentScore) {
    strikeIncorrect(correctAnswer)
    const update = truthiness ? 'correct' : 'incorrect'
    $('#verification').children('h3').text(`Your answer is ${update}.`)
    $('#verification').children('h2').text(`Your current score is ${currentScore}.`)
    // want
    $('#question').children('#count').text(pluralizeCountdown(counter))
    // $('#verification').children('.countdown').text(pluralizeCountdown(counter))
    $('#verification').show()
  }

  function pluralizeCountdown(counter) {
    if ((counter - 1) == 1) {
      return `1 question remains.`
    }
    else if ((counter - 1) == 0) {
      return `That was the final question.`
    }
    else {
      return `${counter - 1} questions remain.`
    }
  }

  function getOutroView(currentScore) {
    $('#game-view').hide()
    $('#outro-view').show()
    determineOutro(currentScore)
  }

  function openDoor(el) {
    setTimeout(function () {
      el.addClass("thumbOpened")
    }, 1100)
  }

  function determineOutro(currentScore) {
    if (currentScore == 5) {
      $('#score-view').children('h2').text(`You answered all questions correctly.`)
    }
    else if (currentScore == 1) {
      $('#score-view').children('h2').text(`You answered 1 question correctly.`)
    }
    else {
      $('#score-view').children('h2').text(`You answered ${currentScore} questions correctly.`)
    }

    if (currentScore > 4) {
      $('#closed-door-img').remove()
      $('#door-panel').addClass('thumb')
      $('.door-frame').show().addClass('holmes')
      $('#door-status').children('h2').text('Mr. Holmes opens the door.')
      $('#character-response').text("Hullo! I was badly in need of a case, and this looks, from the state of your shoes, as if it were of importance. Do come inside. The game is afoot!")
      var door = $('.thumb')
      openDoor(door)
    } else if (currentScore > 2) {
      $('#closed-door-img').remove()
      $('#door-panel').addClass('thumb')
      $('.door-frame').show().addClass('watson')
      $('#door-status').children('h2').text('Dr. Watson opens the door.')
      $('#character-response').text("Holmes is scraping upon his violin. Yours may be the case he has been longing for.")
      var door = $('.thumb')
      openDoor(door)
    } else if (currentScore > 0) {
      $('#closed-door-img').remove()
      $('#door-panel').addClass('thumb')
      $('.door-frame').show().addClass('hudson')
      $('#door-status').children('h2').text('Mrs. Hudson opens the door.')
      $('#character-response').text("Mister Holmes is currently engaged in a rather malodorous scientific experiment- you'd best come back again, later.")
      var door = $('.thumb')
      openDoor(door)
    } else if (currentScore === 0) {
      $('#score-view').children('h2').text(`You answered no questions correctly.`)
      $('#door-status').children('h2').text('It seems no one is at home.')
    } else {
      $('#score-view').children('h2').text(`Mysteriously your score is unavailable`)
      $('#door-status').children('h2').text('Mr. Holmes opens the door.')
    }
  }

  // gameplay

  getQuestionView(counter)

  function parseUserAnswer(event) {
    let userAnswer = $(event.currentTarget).attr('id')
    return userAnswer
  }

  $('input').click(event => {
    const userAnswer = parseUserAnswer(event)
    userGameClassInstance.setUserAnswer(userAnswer)
  })

  $('#submit-answer').click(event => {
    event.preventDefault();
    const correctAnswer = Object(__WEBPACK_IMPORTED_MODULE_1__gameHelpers__["a" /* getCorrectAnswer */])(counter, __WEBPACK_IMPORTED_MODULE_0__quiz__["a" /* quiz */])
    const truthiness = verifyUserAnswer(correctAnswer)
    scoreArray.push(truthiness)
    const currentScore = Object(__WEBPACK_IMPORTED_MODULE_1__gameHelpers__["b" /* tallyScore */])(scoreArray)
    getAnswerView(truthiness, correctAnswer, currentScore)
    console.log('current score', currentScore)
    return currentScore
  })


  $('#next-question').click(event => {
    $('#verification').hide()
    counter--
    if (counter > 1) {
      getQuestionView(counter)
    } else if (counter === 1) {
      getQuestionView(counter)
      console.log('i think this is the last q')
    } else {
      console.log('do something', counter)
    }
  })

  $('#view-final-score').click(event => {
    const currentScore = Object(__WEBPACK_IMPORTED_MODULE_1__gameHelpers__["b" /* tallyScore */])(scoreArray)
    getOutroView(currentScore)
  })

  $('.reset').click(e => {
    window.location.reload(true);
    scoreArray = []
    counter = 0
  })


  /// here be dragons
}


$('#start-game').click(e => {
  console.log('The game is afoot!')
  main()
})


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const quiz =[
  {
    q: 'Irene Adler was',
    s: ['a French heiress', 'an American opera singer', 'an Italian window', 'a Greek interpreter', 'a British spy'],
    a: 1,
  },
  {

    q: 'Which of these women does not appear in the Holmes stories?',
    s: ['Violet Hunter', 'Violet Smith','Violet Blackwood', 'Violet de Merville', 'Violet Westbury'],
    a: 2
  },
  {
    q: 'Which of these is not among Holmes’ many disguises?',
    s: ['An Italian priest', 'An elderly woman', 'A plumber', 'A soliciter', 'A sea captain'],
    a: 3
  },
  {
    q: 'Which  Sherlock Holmes story takes place on Christmas day?',
    s: ['The Adventure of the Abbey Grange', 'The Adventure of the Bruce-Partington Plans', 'The Adventure of the Noble Bachelor', 'The Adventure of the Blue Carbuncle', 'something else'],
    a: 3
  },
  {
    q: 'Who never saw Mr. Holmes without a disguise?',
s: ['The King of Bohemia', 'Irene Adler', 'The Norfolk Builder', 'Mrs. Hudson', 'Professor Moriarty'],
    a: 1
  }
]
/* harmony export (immutable) */ __webpack_exports__["a"] = quiz;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = tallyScore;
/* harmony export (immutable) */ __webpack_exports__["a"] = getCorrectAnswer;
// function scoreKeeper(score) {
//   console.log(`Your current score is ${score} - ${num} questions remain.`)
// }

function tallyScore(scoreArray) {
  return scoreArray.filter(function (x) {
    return x == true
  }).length
}

function getCorrectAnswer(counter, quiz) {
  const i = counter - 1
  const correctAnswer = quiz[i]['a']
  console.log('correct answer', correctAnswer)
  return correctAnswer
}


/***/ })
/******/ ]);