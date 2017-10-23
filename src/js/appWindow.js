var tool = require('./draggable')
var id = 0
function appWindow (config) {
  makePanel(config.desktop)
  makeHeader()
  setTitle(config.title)
  setExitButton()
  return makeContentPanel()
}

function makePanel (desktop) {
  this.panel = document.createElement('div')
  this.panel.setAttribute('class', 'window_panel')
  this.panel.setAttribute('id', 'window_panel' + id)
  tool.draggableMe('window_panell' + id)
  id++
  desktop.appendChild(this.panel)
  return this.panel
}

function makeHeader () {
  this.header = document.createElement('div')
  this.header.setAttribute('class', 'window_header')
  this.panel.appendChild(this.header)
}

function setTitle (string) {
  this.title = document.createElement('div')
  this.title.setAttribute('class', 'window_title')
  this.title.innerHTML = string
  this.header.appendChild(this.title)
}

function setExitButton () {
  this.exitBtn = document.createElement('a')
  this.exitBtn.setAttribute('href', '#')
  this.exitBtn.setAttribute('class', 'window_exitBtn')
  let img = document.createElement('img')
  this.exitBtn.appendChild(img)
  img.setAttribute('src', 'image/exit.ico')
  this.header.appendChild(this.exitBtn)
}

function makeContentPanel () {
  this.contentPanel = document.createElement('div')
  this.contentPanel.setAttribute('class', 'window_contentPanel')
  this.panel.appendChild(this.contentPanel)
  return this.contentPanel
}

module.exports = appWindow
