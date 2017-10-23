function CanvasPaint (container) {
  var canvas = document.createElement('canvas')
  container.appendChild(canvas)
  var context = canvas.getContext('2d')
  var mouseDown = false

  function setUpCanvas () {
    canvas.height = 480
    canvas.width = 320
    context.lineWidth = 20
    context.lineCap = 'round'
    context.strokeStyle = 'rgb(0, 0 ,50 )'
  }

  function onDown (e) {
    mouseDown = true
    e.preventDefault()
  }
  function onUp (e) { mouseDown = false; e.preventDefault() }
  function onMove (e) { if (mouseDown) paint(e.clientX, e.clientY) }

  function paint (x, y) {
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(x, y)
    context.stroke()
    context.closePath()
  }

  canvas.addEventListener('mousedown', onDown, false)
  canvas.addEventListener('mouseup', onUp, false)
  canvas.addEventListener('mousemove', onMove, false)
  setUpCanvas()
  return canvas
}

module.exports = CanvasPaint
