export function tallyScore(scoreArray) {
  return scoreArray.filter(function (x) {
    return x == true
  }).length
}

export function getCorrectAnswer(counter, quiz) {
  const i = counter - 1
  const correctAnswer = quiz[i]['a']
  return correctAnswer
}
