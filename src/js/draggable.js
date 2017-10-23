module.exports = {
  draggableMe: draggableMe
}

function draggableMe (id) {
  window.onload = function () {
    draggable(id)
  }
}

var dragObj = null
function draggable (id) {
  var obj = document.getElementById(id)
  obj.style.position = 'absolute'
  obj.onmousedown = function () {
    dragObj = obj
  }
}

document.onmouseup = function (e) {
  dragObj = null
}

document.onmousemove = function (e) {
  var x = e.pageX
  var y = e.pageY

  if (dragObj == null) { return }

  dragObj.style.left = x + 'px'
  dragObj.style.top = y + 'px'
}
