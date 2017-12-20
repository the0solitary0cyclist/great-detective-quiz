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

  var userGameClassInstance = new userGameClass()

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
      newQuestion(counter, quiz)
    } else {
      console.log('now is not the time for a new Q')
    }
  }

  function getAnswerView(correctAnswer, currentScore) {
    strikeIncorrect(correctAnswer)
    let answerViewText = `Your current score is ${currentScore}   –   ${pluralizeCountdown(counter)}`
    $('#question').children('#count').text(answerViewText)
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
    const correctAnswer = getCorrectAnswer(counter, quiz)
    const truthiness = verifyUserAnswer(correctAnswer)
    scoreArray.push(truthiness)
    const currentScore = tallyScore(scoreArray)
    getAnswerView(correctAnswer, currentScore)
    console.log('current score', currentScore)
    return currentScore
  })


  $('#next-question').click(event => {
    userGameClassInstance.setUserAnswer(undefined)
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
