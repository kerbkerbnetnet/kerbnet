
import { algorithm } from './algorithm.js';

////////////////////////////////////////////////////////////////////////////////

let cityCount = 10;
let boardSize = 500
let batchAmount = 500;
let totalGenerations = 500;
let bruteForceValue = false;
let custom
let canvas = document.querySelector('canvas')
const can = canvas.getContext("2d")
canvas.height = 500
canvas.width = 500
can.lineWidth = 15
can.strokeStyle = "black"


const fullGenerate = () => {
  document.querySelector('#generation').textContent = ''
  can.reset()
  let generation
  if (custom === undefined) {
    generation = algorithm(cityCount, boardSize, batchAmount, totalGenerations, bruteForceValue, custom)
  } else {
    generation = algorithm(cityCount, boardSize, batchAmount, totalGenerations, bruteForceValue, custom)
  }
  if (bruteForceValue) {
    document.querySelector('#fitness').textContent = 'algorithm fitness: ' + Math.floor(1 / generation.algorithmFitness * 100000) + ', ' + 'bruteforce fitness: ' + Math.floor(1 / generation.bruteforceFitness * 100000)
  } else {
    document.querySelector('#fitness').textContent = 'fitness: ' + generation.fitness
    for (let i = 0; i < generation.path.length; i++) {
      let list = document.createElement('li')
      list.append(document.createTextNode(JSON.stringify(generation.path[i])))
      document.querySelector('#generation').append(list)
    }
  }
  console.log(generation)
  drawPath(generation)
}

const drawPath = (pandf) => {
  // this part works but leaves out the lines for some reason
  // for (let j = 0; j < pandf.path.length; j++) {
    // can.beginPath()
    // can.strokeStyle = "black"
    // can.ellipse(pandf.path[j].x, pandf.path[j].y, 5, 5, 0, 0, 360)
    // can.fill()
  // }
  can.beginPath()
  can.strokeStyle = "black"
  can.moveTo(pandf.path[0].x, pandf.path[0].y)
  for (let i = 1; i < pandf.path.length; i++) {
    can.lineTo(pandf.path[i].x, pandf.path[i].y)
    can.beginPath()
    can.ellipse(pandf.path[i].x, pandf.path[i].y, 5, 5, 0, 0, 360)
    can.fill()
    can.stroke
  }
  can.stroke()
  console.log('path drawn')
}

document.querySelector('#bruteForce').onclick = () => { if (bruteForceValue) { bruteForceValue = false } else { bruteForceValue = true } };
document.querySelector('#generate').onclick = () => fullGenerate();
document.querySelector('#cities').onchange = (e) => { if (e.target.value !== '') { cityCount = e.target.value } else { console.log('cities is empty') } };
document.querySelector('#boardSize').onchange = (e) => { if (e.target.value !== '') { boardSize = e.target.value; canvas.width = e.target.value; canvas.height = e.target.value } else { console.log('boardSize is empty') } };
document.querySelector('#batchSize').onchange = (e) => { if (e.target.value !== '') { batchAmount = e.target.value } else { console.log('batchSize is empty') } };
document.querySelector('#totGenerations').onchange = (e) => { if (e.target.value !== '') { totalGenerations = e.target.value } else { console.log('totGenerations is empty') } };
document.querySelector('#custom').onchange = (e) => { if (e.target.value !== '') { custom = e.target.value } else { console.log('totGenerations is empty') } };
