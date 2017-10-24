function CanvasPaint (container) {
  var canvas = document.createElement('canvas')
  container.appendChild(canvas)
  var context = canvas.getContext('2d')
  var mouseDown = false
  var toolbar = document.createElement('div')

  function setUpToolBar () {
    toolbar.setAttribute('id', 'paint_toolbar')
    container.appendChild(toolbar)
    // Colors
    var colors = ['white', 'black', 'red', 'yellow', 'green']
    for (let i = 0; i < colors.length; i++) {
      let c = colors[i]
      var a = document.createElement('a')
      var img = document.createElement('img')
      a.appendChild(img)
      img.setAttribute('src', '../image/' + c + '.jpg')
      toolbar.appendChild(a)
      a.addEventListener('click', function () {
        context.strokeStyle = c
      })
    }
    // Brush size
    var divSlider = document.createElement('div')
    divSlider.setAttribute('id', 'divSlider')
    toolbar.appendChild(divSlider)
    var sizeSlider = document.createElement('input')
    sizeSlider.setAttribute('id', 'sizeSlider')
    sizeSlider.setAttribute('type', 'range')
    sizeSlider.setAttribute('min', '0')
    sizeSlider.setAttribute('max', '50')
    sizeSlider.setAttribute('value', '25')
    divSlider.appendChild(sizeSlider)
    sizeSlider.oninput = function () {
      context.lineWidth = this.value
    }
  }

  function setUpCanvas () {
    canvas.height = 480 // match them with css
    canvas.width = 320  // match them with css
    context.lineWidth = 20
    context.lineCap = 'round'
    context.strokeStyle = 'black'
  }

  function onDown (e) {
    mouseDown = true
    e.preventDefault()
  }
  function onUp (e) { mouseDown = false; e.preventDefault() }
  function onMove (e) { if (mouseDown) paint(e.clientX, e.clientY) }

  function paint (x, y) {
    var rect = canvas.getBoundingClientRect()
    x -= rect.left
    y -= rect.top

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
  setUpToolBar()
  return canvas
}

module.exports = CanvasPaint
