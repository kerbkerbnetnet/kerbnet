let image = document.querySelector('#mona-lisa');

let canvas = document.querySelector('canvas');

let picture = document.querySelector('#picture');

let canvChild = document.querySelector('#child')


let ccy = canvChild.getContext("2d")
let ctx = canvas.getContext("2d");
let cdy = picture.getContext("2d");

const imgDraw = () => {
    picture.height = image.height / 2
    picture.width = image.width / 2
    canvas.height = picture.height
    canvas.width = picture.width
    canvChild.width = canvas.width
    canvChild.height = canvas.height
    cdy.drawImage(image, -(image.width / 4), 0)
}

if (image.complete) {
   imgDraw()
} else {
   image.onload = imgDraw
}
//canvChild.width = 300
//canvChild.height = 300
//picture.width = 300
//picture.height = 300
//canvas.height = 300
//canvas.width = 300
//cdy.fillStyle = 'red'
//cdy.fillRect(0, 0, 500, 500)

//specific max amount, then generates random numbers
const maxRandom = (max) => {
    return Math.floor(Math.random() * max)
};
// returns a random value that is acceptable in RGBA
const randomRGBA = () => {
    return maxRandom(255)
}

//draws the first batch of random triangles around the canvas
const randomTriangles = (triangleCount) => {
    let batch = []
    for (let i = 0; i < triangleCount; i++) {
        let r = randomRGBA()
        let g = randomRGBA()
        let b = randomRGBA()
        let a = randomRGBA()
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`
        let maxY = maxRandom(canvas.height)
        let maxX = maxRandom(canvas.width)
        let triObj = { 'points': [], 'color': { r, g, b, a } }
        triObj.points.push({ 'x': maxX, 'y': maxY })
        for (let i = 0; i < 2; i++) {
            let xDistance = maxX
            if (maxRandom(2) === 1) {
                xDistance = maxX + (maxRandom(50) + 50)
            } else {
                xDistance = maxX - (maxRandom(50) + 50)
            }
            let yDistance = maxY
            if (maxRandom(2) === 1) {
                yDistance = maxY + (maxRandom(50) + 50)
            } else {
                yDistance = maxY - (maxRandom(50) + 50)
            }
            triObj.points.push({ 'x': xDistance, 'y': yDistance })
        }
        batch.push(triObj)
    }
    return batch
}

const drawBatch = (batch) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < batch.length; i++) {
        drawTriangle(batch[i])
    }
    console.log('batch drawn')
}

/*
 * Translate value at a given alpha to the corresponding value at full opacity.
 * Loosely based on code from https://stackoverflow.com/a/11615135.
 */
const opaquify = (v, a) => Math.round((v * a) / 255 + (255 - a));

/*
 * Translate rgba values we get from ImageData into RGB triples.
 */
const toRGB = (r, g, b, a) => [r, g, b].map((v) => opaquify(v, a));

const fitness = () => {
    let totFitness = 0
    let drawData = ctx.getImageData(0, 0, picture.width, picture.height).data
    let imgData = cdy.getImageData(0, 0, picture.width, picture.height).data
    for (let i = 0; i < (drawData.length); i += 4) {
        let drawPixel = drawData.slice(i, i + 4)
        let imgPixel = imgData.slice(i, i + 4)
        let rgbDraw = toRGB(...drawPixel)
        let rgbIMG = toRGB(...imgPixel)
        totFitness = totFitness + (((rgbIMG[0] - rgbDraw[0]) ** 2) + ((rgbIMG[1] - rgbDraw[1]) ** 2) + ((rgbIMG[2] - rgbDraw[2]) ** 2))
    }
    return 1 / Math.sqrt(totFitness)
}

const batchFitness = (batch) => {
    drawBatch(batch.triangles)
    let fit = fitness()
    return { 'fitness': fit, 'triangles': batch.triangles }
}

const cross = (triangles) => {
    let newBatch = []
    for (let i = 1; i < triangles.length; i++) {
        let firstHalf = triangles[i - 1].triangles.slice(0, triangles[i - 1].triangles.length / 2)
        let secondHalf = triangles[i].triangles.slice(triangles[i].triangles.length / 2, triangles[i].triangles.length)
        newBatch.push({ 'fitness': 0, 'triangles': mutate(mix(firstHalf.concat(secondHalf)), .5) })
    }
    return newBatch
}

const mix = (triangles) => {
    for (let i = 0; i < 2; i++) {
        triangles[maxRandom(triangles.length)].temp = true
    }
    let tempTriangles = triangles.filter((a) => a.temp === true)
    let normalTriangles = triangles.filter((a) => !(a.temp === true))

    return normalTriangles.concat(tempTriangles)
}

const mutate = (triangles, chance) => {
    let ntriangles = []
    for (let i = 0; i < triangles.length; i++) {
        if (Math.random() < chance) {
            ntriangles.push(allChange(triangles[i]))
        } else { ntriangles.push(triangles[i]) }
    }
    return ntriangles
}

const allChange = (triangle) => {
    let nPoints = []
    for (let i = 0; i < triangle.points.length; i++) {
        let change = 25
        nPoints.push({ 'x': clamp(triangle.points[i].x + maxRandom(change) - change / 2, 0, canvas.width), 'y': clamp(triangle.points[i].y + maxRandom(change) - change / 2, 0, canvas.height )})
    }
    return { 'points': nPoints, 'color': colorChange({...triangle.color}) }
}

const colorChange = (color) => {
    let factor = 20
    let changeFactor = maxRandom(factor) - factor / 2
    let random = Math.random()
    if (random < .25) {
        color.r = clamp(color.r + changeFactor, 0, 255)
      } else if (random < .5) {
        color.g = clamp(color.g + changeFactor, 0, 255)
      } else if (random < .75) {
        color.b = clamp(color.b + changeFactor, 0, 255)
      } else {
        color.a = clamp(color.a + changeFactor, 0, 255) 
      }
    return color
}

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

const drawTriangle = (triangle) => {
    ctx.beginPath()
    ctx.fillStyle = `rgba(${triangle.color.r}, ${triangle.color.g}, ${triangle.color.b}, ${triangle.color.a / 255})`
    ctx.moveTo(triangle.points[0].x, triangle.points[0].y)
    for (let i = 1; i < triangle.points.length; i++) {
        ctx.lineTo(triangle.points[i].x, triangle.points[i].y)
    }
    ctx.fill()
}

const altDrawBatch = (batch) => {
    ccy.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < batch.length; i++) {
        altDrawTriangle(batch[i])
    }
}

const altDrawTriangle = (triangle) => {
    ccy.beginPath()
    ccy.fillStyle = `rgba(${triangle.color.r}, ${triangle.color.g}, ${triangle.color.b}, ${triangle.color.a / 255})`
    ccy.moveTo(triangle.points[0].x, triangle.points[0].y)
    for (let i = 1; i < triangle.points.length; i++) {
        ccy.lineTo(triangle.points[i].x, triangle.points[i].y)
    }
    ccy.fill()
}

document.querySelector('#asex').onclick = () => {

    let chance = 0.4;
    let best = { 'fitness': 0, 'triangles': randomTriangles(50) };

    const step = () => {
        const child = batchFitness({ 'fitness': 0, 'triangles': mutate(best.triangles, chance) });
        if (child.fitness > best.fitness) {
            console.log(`child is better`);
            best = child;
            altDrawBatch(best.triangles)
        }
        requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
};