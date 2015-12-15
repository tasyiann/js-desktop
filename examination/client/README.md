In this examination assignment you are supposed to build what we call a "Personal Web Desktop" (PWD).  First of all, have a look at this recording to get a better view of the assignment.

[Demo - Personal Web Desktop](https://youtu.be/zHFjfoUWONY)

## Requirements
Please check that your application meets the requirements below before submitting your final version.

### Functional requirements PWD:
* The application should be a single page application.
* The user shall be able to open multiple windows within the application.
* The user shall be able to drag and move the windows in the document.
* The user shall be able to open and close new windows of the desired application by clicking or double clicking an icon at the desktop.
* The icon used to open the window should be represented in the upper bar of the window.
* Windows should get focus when clicked/dragged.
* The window with focus shall be on top of all other windows.

The following three applications should at least be included in the desktop application:
* A memory-game
* A chat connected to a central chat channel using websockets
* One, by you, designed and decided application

### Non functional requirements PWD:
* The application shall be visually appealing
* The code shall be organized in appropriate modules

## The memory game application
See [exercise/memory/README.md](https://github.com/1dv022/exercise/blob/memory/exercise/memory/README.md) for a description of this application.

### Functional requirements, Memory application:
* The user should be able to open and play multiple memory games simultaneously.
* The user should be able to play the game using only the keyboard.
* One, by you decided, extended feature

## The chat application
The chat application shall be connected to other students chats via a web socket-server.

### The server
The server address is: `ws://vhost3.lnu.se:20080/socket/`

You connect to the server via web sockets and send messages using the json format:

```json
{
  "type": "message",
  "data" : "The message text is sent using the data property",
  "username": "MyFancyUsername",
  "channel": "my, not so secret, channel",
  "key": "A api-key. Found when logged in on the course webpage"
}
```
The properties `type`, `data`, `username` and `key` are mandatory when **sending** a message to the server.
The properties `type`, `data` and  `username` will always be present when you **receive** a message from the server. Additionally, all properties sent from one user will be echoed to all receiving clients.

### The API-key
To get the api-key to the chat application please log in at the [profile page](https://coursepress.lnu.se/kurs/klientbaserad-webbprogrammering/course-information/profile-information/) on the course web page.
The key is used to keep track of users of the application and to curb abuse.

### Heartbeat
The web socket server will send a "heartbeat" message to keep the connection open. This message is sent every 40 seconds and have the following structure:
```json
{
  "type": "heartbeat",
  "data" : "",
  "username": "Server"
}
```

Your application can simply ignore those messages completly.

### Functional requirements, Chat application:
* The user should be able to have several chat applications running at the same time.
* When the user opens the application for the first time the user should be asked to write his/her username.
* The username should remain the same the next time the user starts a chat application or the PWD is restarted.
* The user should be able to send chat messages using a textarea.
* The user should be able to see at least the 20 latest messages since the chat applications was opened.
* One, by you decided, extended feature.

You are free to add functionality not described above. Added functionality could be:
* Ability to choose which channel to listen to.
* Caching message history.
* Added support for emojis.
* Added support for writing code.
* Ability to change username.
* Encrypted messages on a special channel to allow secret communication.
* Added functionality to the "chat protocol". Discuss with others in the course and agree upon added functionality to add to the sent messages.
* Use the messages to play memory against an opponent. Perferably using a seperate channel.

#### Disclaimer
All students working on this assignment uses the same server and can read all messages sent by you. You should at all times mind your language. The channels are monitored and abuse will not be tolerated.

## Hints and recommendations
Hints and recommendations below are only suggestions and nothing you need to abide by.

### Basic hints
* This assignment can look big at first glance. Please take an hour or two using pen and paper to sketch up your application visually as well as structuring your code to come. Should you make use of types? In that case, which types can you identify?
* All windows should have a similar look and feel. Maybe you can make a type for a basic window and use inheritance for your applications?
* Your applications should be isolated units. Can you make them in such a way that they are independent of your PWD-application?
* https://thenounproject.com/ is a great place to find icons for your project. (Take note of how you should attribute the creator)
* Your application will look a lot nicer if you add a background image to your "desktop".

### Advanced hints
* What happens if you open multiple windows? Maybe the windows should stack using an offset?
* Can you handle windows bouncing of the edges? How is this handled in your operating system?
* What will happen if you have 1000 applications in your PWD? Can your applications be dynamically loaded from the server when the user starts the app for the first time instead of be loaded into the PWD at first page load?  
* Do some of your applications have loading times? Maybe you should have a built in system for handling progressbars and/or loading icons.
