var pos = 10
function WindowApp () {
  // End of what's configurable.
  var clicked = null
  var b, x, y

  var desktop = document.querySelector('body')
  var pane = document.createElement('div')
  pane.setAttribute('id', 'pane')
  pane.style.left = '' + (pos += 2) + '%'
  pane.style.top = '' + (pos) + '%'
  var header = document.createElement('div')
  header.setAttribute('id', 'window_header')
  pane.appendChild(header)

  var content = document.createElement('div')
  content.setAttribute('id', 'content')
  desktop.appendChild(pane)
  pane.appendChild(content)

  // set exit button
  var exitA = document.createElement('a')
  exitA.setAttribute('href', '#')
  var exitImg = document.createElement('img')
  exitImg.setAttribute('id', 'exit_icon')
  exitImg.setAttribute('src', 'image/exit.png')
  exitA.appendChild(exitImg)
  header.appendChild(exitA)

  // Exit event
  exitA.addEventListener('click', function () {
    pane.parentNode.removeChild(pane)
  })

  // Mouse events
  pane.addEventListener('mousedown', onMouseDown)
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)

  // Touch events
  pane.addEventListener('touchstart', onTouchDown)
  document.addEventListener('touchmove', onTouchMove)
  document.addEventListener('touchend', onTouchEnd)

  function onTouchDown (e) { onDown(e.touches[0]); e.preventDefault() }
  function onTouchMove (e) { onMove(e.touches[0]) }
  function onTouchEnd (e) { if (e.touches.length === 0) onUp(e.changedTouches[0]) }
  function onMouseDown (e) { onDown(e) }
  function onUp (e) { calc(e); clicked = null }
  function onDown (e) {
    bringToFront()
    calc(e)

    clicked = {
      x: x,
      y: y,
      cx: e.clientX,
      cy: e.clientY,
      isMoving: canMove()
    }
  }

  function canMove () {
    return x > 0 && x < b.width && y > 0 && y < b.height && (y < 30)
  }

  function calc (e) {
    b = pane.getBoundingClientRect()
    x = e.clientX - b.left
    y = e.clientY - b.top
  }

  var e
  function onMove (ee) { calc(ee); e = ee }
  function animate () {
    window.requestAnimationFrame(animate)
    if (clicked && clicked.isMoving) {
      // moving
      pane.style.top = (e.clientY - clicked.y) + 'px'
      pane.style.left = (e.clientX - clicked.x) + 'px'
      return
    }
    // style cursor
    if (canMove()) {
      pane.style.cursor = 'move'
    } else {
      pane.style.cursor = 'default'
    }
  }

  animate()

  function bringToFront () {
    var descendents = desktop.getElementsByTagName('*')
    for (let i = 0; i < descendents.length; i++) {
      let x = descendents[i]
      x.classList.remove('toFront')
      x.classList.add('toBack')
    }
    pane.classList.remove('toBack')
    pane.classList.add('toFront')
  }

  return content
}

module.exports = WindowApp
