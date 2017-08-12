/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const quiz =[
  {
    q: 'foo1',
    s: ['foo1A','foo1B','foo1C','foo1D'],
    a: 1,
  },
  {
    q: 'foo2',
    s: ['foo2A','foo2B','foo2C','foo2D'],
    a: 2
  },
  {
    q: 'foo3',
    s: ['foo3A','foo3B','foo3C','foo3D'],
    a: 3
  },
  {
    q: 'foo4',
    s: ['foo4A','foo4B','foo4C','foo4D'],
    a: 0
  },
  {
    q: 'foo5',
    s: ['foo5A','foo5B','foo5C','foo5D'],
    a: 1
  }
]
/* harmony export (immutable) */ __webpack_exports__["a"] = quiz;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quiz__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gameHelpers__ = __webpack_require__(0);



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

  var userGameClassInstance = new userGameClass();

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
    $('label').addClass('incorrect')
    $(`label[for=answer${correctAnswer}]`).removeClass('incorrect')
    $(`label[for=answer${correctAnswer}]`).addClass('correct')
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
      $('#game-view').show()
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
    $('#verification').children('.countdown').text(`${counter-1} questions remain.`)
    $('#verification').show()
  }

  function getOutroView(currentScore) {
    $('#game-view').hide()
    $('#outro-view').show()
    determineOutro(currentScore)
  }

  function determineOutro(currentScore) {
    $('#score-view').children('h2').text(`You answered ${currentScore} questions correctly.`)
    if (currentScore > 3) {
      $('.door-closed').attr('background', 'url(.images/MrHolmes.jpg')
      $('#door-status').children('h2').text('Mr. Holmes opens the door.')
    } else if (currentScore > 2) {
      $('.door-closed').attr('background', 'url(./images/MrsHudson.jpg')
      $('#door-status').children('h2').text('Mr. Holmes opens the door.')
    } else if (currentScore > 0) {
      $('.door-closed').attr('background', 'url(./images/DrWatson.jpg')
      $('#door-status').children('h2').text('Dr. Watson opens the door.')
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
    const correctAnswer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__gameHelpers__["a" /* getCorrectAnswer */])(counter, __WEBPACK_IMPORTED_MODULE_0__quiz__["a" /* quiz */])
    const truthiness = verifyUserAnswer(correctAnswer)
    scoreArray.push(truthiness)
    const currentScore = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__gameHelpers__["b" /* tallyScore */])(scoreArray)
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
    const currentScore = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__gameHelpers__["b" /* tallyScore */])(scoreArray)
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


/***/ })
/******/ ]);