module.exports.randomInt = (n) => {
    return Math.round(Math.random() * n);
};


const weightedRandom = (data) => {

    const total = data.reduce((prev, next) => prev + next[1], 0)

    const threshold = Math.random() * total

    let count = 0

    for (const value of data) {
        count += value[1]

        if (count >= threshold) {
            return value[0]
        }
    }

    return data[data.length - 1][0]
}

// const data = [[0, 50], [1, 30], [3, 15], [4, 5]]

// console.log(weightedRandom(data))

module.exports.weightedRandom = weightedRandom