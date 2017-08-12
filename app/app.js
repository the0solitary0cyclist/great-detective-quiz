import { quiz } from './quiz'
import { tallyScore, getCorrectAnswer } from './gameHelpers'

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

  let counter = quiz.length

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
      $('#game-view').show()
      $('#intro-view').hide()
      $('#outro-view').hide()
      cleanUpPrevious()
      $('#submit-answer').show()
      newQuestion(counter, quiz)
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
    const correctAnswer = getCorrectAnswer(counter, quiz)
    const truthiness = verifyUserAnswer(correctAnswer)
    scoreArray.push(truthiness)
    const currentScore = tallyScore(scoreArray)
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
    const currentScore = tallyScore(scoreArray)
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
