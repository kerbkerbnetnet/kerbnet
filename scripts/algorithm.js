// travelling salesman problem code

// shuffles an array, switching positions of parts of the array
const arrayShuffler = (array) => {
    let indBatch = [...array]
    for (let j = 0; j < array.length; j++) {
        let random = array[maxRandom(array.length)]
        indBatch.splice(indBatch.indexOf(random), 1)
        indBatch.push(random)
    };
    return indBatch
};

// returns a random whole number between 0 and max
const maxRandom = (max) => {
    return Math.floor(Math.random() * max)
};

////////////////////////////////////

// makes random cities on a grid, represented with an x and y axis
const makeCities = (nCities, boardSize) => {
    let cityArray = []
    for (let i = 0; i < nCities; i++) {
        cityArray.push({ x: maxRandom(boardSize), y: maxRandom(boardSize) })
    };
    return cityArray
};

// creates a batch of paths based on a previous array
const createBatch = (cityList, batchAmount) => {
    let batch = []
    for (let i = 0; i < batchAmount; i++) {
        batch.push(arrayShuffler(cityList))
    };
    return batch
};

// judges the fitness of an individual path based on how long the total amount of lines are
const indFitness = (path) => {
    let fitness = 0
    for (let i = 1; i < path.length; i++) {
        fitness = fitness + (Math.abs(path[i].x - path[i - 1].x) + Math.abs(path[i].y - path[i - 1].y))
    };
    return fitness
};

// meant to return an array with paths.length amount of objects, all of which contain the fitness and an array of x and y coordinates
const groupFitness = (paths) => {
    let nPaths = []
    for (let i = 0; i < paths.length; i++) {
        nPaths.push({ 'path': paths[i], 'fitness': indFitness(paths[i]) })
    };
    return nPaths
};

// to update the fitness of a path
const updateFitness = (paths) => {
    for (let i = 0; i < paths.length; i++) {
        paths[i].fitness = indFitness(paths[i].path)
    };
    return paths
};

// sorts by fitness, best to worst, and cuts out lower half
const sortByFitness = (paths) => {
    paths.sort((b, a) => a.fitness - b.fitness)
    return paths.slice(Math.floor(paths.length / 2), paths.length)
};

// switches out a part from one path to the next
const evolve = (paths, batchN) => {
    let limit = paths.length
    for (let i = 1; i < batchN - limit; i++) {
        let newPath = { 'path': [...paths[i - 1].path], 'fitness': paths[i - 1].fitness };
        let part = maxRandom(paths[i].path.length)
        let switchedPart = { 'part': paths[i].path[part], 'index': paths[i].path.indexOf(paths[i].path[part]) };
        let oldPart = { 'part': paths[i - 1].path[switchedPart.index], 'index': paths[i - 1].path.indexOf(paths[i].path[part]) };
        newPath.path[switchedPart.index] = switchedPart.part
        newPath.path[oldPart.index] = oldPart.part
        paths.push(newPath)
    };
    return paths
};

//runs the functions from above
const algorithm = (cityCount, boardSize, batchAmount, limit, useBruteForce, useCustomCities) => {
    let cityArray = makeCities(cityCount, boardSize)
    let firstBatch
    if (useCustomCities !== undefined) {
        firstBatch = useCustomCities
    } else {
        firstBatch = createBatch(cityArray, batchAmount)
    }
    let currentBatch = groupFitness([...firstBatch])
    for (let i = 0; i < limit; i++) {
        let newBatch = sortByFitness(updateFitness(currentBatch))
        currentBatch = evolve(newBatch, batchAmount)
    };
    // use to check if algorithm is performing better than a bruteforce algorithm
    if (useBruteForce) {
        let bruteForceFitness = bruteForce(firstBatch, limit)[0].fitness
        return { 'bruteforceFitness': bruteForceFitness, 'algorithmFitness': currentBatch[0].fitness, 'algorithm<bruteforce?': currentBatch[0].fitness < bruteForceFitness }
    };
    return currentBatch[0]
};

// bruteforce solution to the vender problem, used to check if the algorithm is faster
const bruteForce = (cityArray, limit) => {
    let max = cityArray.length
    let batch = groupFitness([...cityArray])
    for (let i = 0; i < limit; i++) {
        batch = sortByFitness(updateFitness(batch))
        let freshBatch = groupFitness(createBatch(batch[0].path, max / 2))
        for (let j = 0; j < max / 2; j++) {
            batch.push(freshBatch[j])
        };
    };
    return batch
};
//amount of cities, size of board (square), amount per batch, total generations, use bruteforce
console.log(algorithm(10, 500, 5, 500, true))

export { algorithm };