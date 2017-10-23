var WindowApp = require('./windowApp')
var Chat = require('./chat')
var CanvasPaint = require('./paint')
var MemoryGame = require('./Memory')

document.querySelector('#chat_icon').addEventListener('click', function () {
  Chat(new WindowApp())
})
document.querySelector('#memorygame_icon').addEventListener('click', function () {
  MemoryGame(4, 4, new WindowApp())
})
document.querySelector('#drawing_icon').addEventListener('click', function () {
  CanvasPaint(new WindowApp())
})
