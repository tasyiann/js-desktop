/* Constructor function of chat */
function Constructor (container) {
  var uname = 'anonymous'
  // Create the user's interface
  var homepanel = document.createElement('div')
  homepanel.setAttribute('id', 'chat_homepanel')
  container.appendChild(homepanel)
  var panel = document.createElement('div')
  panel.setAttribute('id', 'chat_panel')
  var changeUserName = document.createElement('input')
  changeUserName.setAttribute('id', 'changeUserName')
  homepanel.appendChild(changeUserName)
  changeUserName.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
      uname = e.target.value
      container.appendChild(panel)
      container.removeChild(homepanel)
    }
  })

  var log = document.createElement('div')
  log.setAttribute('id', 'chat_log')

  var textBox = document.createElement('input')
  textBox.setAttribute('id', 'chat_textBox')
  panel.appendChild(log)
  panel.appendChild(textBox)

  this.socket = null
  // Keypress event listener - 'ENTER'
  textBox.addEventListener('keypress', function (event) {
    // If enter is pressed
    if (event.keyCode === 13) {
      // Send a message
      // 'this.' will reference the callee of the function which is chatDiv
      sendMessage(event.target.value)
      // Empty textarea
      event.target.value = ''
      // Otherwise the enter will be registered in the text area
      event.preventDefault()
    }
  })
  // Return reference to the chat

  var connect = function () {
    // Use promises
    return new Promise(function (resolve, reject) {
      // If we are connected, then resolve. Don't make another connection
      if (this.socket && this.socket.readyState === 1) {
        resolve(this.socket)
        return
      }
      this.socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
      // when the connection is up and running
      this.socket.addEventListener('open', function () {
        resolve(this.socket)
      }.bind(this))
      // Error handling
      this.socket.addEventListener('error', function (event) {
        reject(new Error('Could not connect'))
      })
      // Listen to messages
      this.socket.addEventListener('message', function (event) {
        var message = JSON.parse(event.data)
        if (message.type === 'message') {
          printMessage(message)
        } else {
          if (message.type === 'heartbeat') { console.log('Chat state: CONNECTED') }
        }
      })
    }.bind(this))
  }
  var sendMessage = function (text) {
    var data = {
      type: 'message',
      data: text,
      username: uname,
      channel: '',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    // Make sure we are connected!
    connect().then(function (socket) {
      socket.send(JSON.stringify(data))
      console.log('sending the message: ', text)
    }).catch(function (error) {
      console.log('Something went wrong', error)
    })
  }
  //
  var printMessage = function (msg) {
    var log = document.querySelectorAll('#chat_log')
    var div = document.createElement('div')
    div.setAttribute('class', 'msg')
    var string = document.createTextNode('<' + msg.username + '> :' + msg.data)
    div.appendChild(string)
    for (let i = 0; i < log.length; i++) {
      console.log('p')
      let copy = document.importNode(div, true)
      log[i].appendChild(copy)
    }
  }
}

module.exports = Constructor
