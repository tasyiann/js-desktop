// This is a module
// And this is the constructor of the module
module.exports = function (rows, cols, container) { // Export the whole module
  var turn1
  var turn2
  var lastTile
  let a
  var pairs = 0
  var tries = 0
  let tiles = [] // aka boxes
  // Initialise our tiles, with the use of a function
  tiles = getPictureArray(rows, cols)
  // Get reference to the container (where to put the game)
  // container = document.getElementById(container)
  // Now, is time to use templates!
  var template = document.createElement('span')
  var aa = document.createElement('a') // whatever is in template, not shown
  aa.setAttribute('href', '#')
  template.appendChild(aa)
  var imgg = document.createElement('img')
  imgg.setAttribute('src', 'image/0.png')
  imgg.setAttribute('class', 'memoryimg')
  aa.appendChild(imgg)
  // For each box
  tiles.forEach(function (tile, index) {
    // Import the template
    // this gives us a clone of the template
    a = document.importNode(template, true)
    container.appendChild(a)
    // Add an event listener to each tile
    a.addEventListener('click', function (event) {  // set parameter the event
      turnBrick(tile, index, event.target)          // event has informations about which img is clicked
    })

    // Why adding 1 to i? because we want it to start from 1
    if ((index + 1) % cols === 0) {
      // add a Br! This will break the line.
      // Make the game 4x4. So, each 4th box, change line
      container.appendChild(document.createElement('br'))
    }
  })// end of foreach

  // Make a new random array with pictures
  function getPictureArray (rows, cols) {
    let i
    let arr = [] // Our tiles
    for (i = 1; i <= rows * cols / 2; i++) {
      arr.push(i)
      arr.push(i)
    } // 1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8
    // - - - - - - - - - - -
    // Shuffle the array ;)
    for (var k = arr.length - 1; k > 0; k--) {
      var j = Math.floor(Math.random() * (k + 1))
      var temp = arr[k]
      arr[k] = arr[j]
      arr[j] = temp
    }
    return arr
  } // end of Making a random array with pictures

  function turnBrick (tile, index, element) {
    // If turn2 is something, then we don't have to get turn1 again
    if (turn2) { return }
    // we click an element. is it an <img>? or is it <a>
    var img = element.nodeName === 'IMG' ? element : element.firstElementChild
    img.src = 'image/' + tile + '.png'

    // if turn1 is null, which means nothing is turned yet (nor turn1 nor 2)
    if (!turn1) {
      // First Brick is clicked
      turn1 = img         // <<
      lastTile = tile     // <<
      // return < For now, return is useless! But pay attention!
    } else {
      // Second card is turned, this counts as a try
      tries++
      // If we double click the same image:
      if (img === turn1) { return }
      turn2 = img
      if (tile === lastTile) {
        // We found a pair!
        pairs++
        if (pairs === (cols * rows) / 2) {
          console.log('WON! ' + tries)
        }
        window.setTimeout(function () {
          turn1.parentNode.classList.add('removed')
          turn2.parentNode.classList.add('removed')
          // Reset the turns
          turn1 = null
          turn2 = null
        }, 300)
      } else {
        window.setTimeout(function () {
          turn1.src = 'image/0.png'
          turn2.src = 'image/0.png'
          // Reset the turns
          turn1 = null
          turn2 = null
        }, 400)
      }
    }
  }
}
