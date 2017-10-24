/* Constructor function of chat */
var chatIDs = 0
function Constructor (container) {
  var chatID = chatIDs++
  var uname = window.localStorage.getItem('username') || 'anonymous'
  // Create the user's interface
  var homepanel = document.createElement('div')
  homepanel.setAttribute('id', 'chat_homepanel')
  container.appendChild(homepanel)
  var panel = document.createElement('div')
  panel.setAttribute('id', 'chat_panel')
  var changeUserName = document.createElement('input')
  changeUserName.setAttribute('id', 'changeUserName')
  var welcometext = document.createElement('div')
  welcometext.innerHTML = 'Connect with your classmates!<br><br>'
  var text2 = document.createElement('div')
  homepanel.appendChild(welcometext)
  homepanel.appendChild(text2)
  // Previous username?
  if (uname === 'anonymous') {
    text2.innerHTML = 'Please choose a username and press enter:'
    homepanel.appendChild(changeUserName)
  } else {
    text2.innerHTML = 'Username: ' + uname + '<br> Continue with the same username?'
    var yes = document.createElement('button')
    yes.innerHTML = 'YES'
    var no = document.createElement('button')
    no.innerHTML = 'NO'
    homepanel.appendChild(yes)
    homepanel.appendChild(no)
    yes.addEventListener('click', function () {
      homepanel.removeChild(no)
      homepanel.removeChild(yes)
      container.removeChild(homepanel)
      container.appendChild(panel)
    })
    no.addEventListener('click', function () {
      text2.innerHTML = 'Please choose a username and press enter:'
      homepanel.removeChild(no)
      homepanel.removeChild(yes)
      homepanel.appendChild(changeUserName)
    })
  }

  changeUserName.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
      uname = e.target.value
      container.removeChild(homepanel)
      container.appendChild(panel)
      window.localStorage.setItem('username', uname)
    }
  })

  var log = document.createElement('div')
  log.setAttribute('id', 'chat_log' + chatID)
  log.setAttribute('class', 'chat_log')
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
      channel: 'my, not so secret, channel',
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
    var log = document.querySelector('#chat_log' + chatID)
    var div = document.createElement('div')
    div.setAttribute('class', 'msg')
    var string = document.createTextNode('<' + msg.username + '>: ' + msg.data)
    div.appendChild(string)
    log.appendChild(div)
  }
}

module.exports = Constructor
