const { performance } = require('perf_hooks')


const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


const executeSequentially = async () => {
    console.log("Executando promessas sequencialmente...")
    const start = performance.now();
    await delay(1000)
    await delay(1000)
    await delay(1000)
    const end = performance.now();
    console.log(`Tempo total (sequencial): ${end - start} ms`)
}

const executeInParallel = async () => {
    console.log("Executando promessas em paralelo...")
    const start = performance.now()
    await Promise.all([delay(1000), delay(1000), delay(1000)])
    const end = performance.now()
    console.log(`Tempo total (paralelo): ${end - start} ms`)
}


const runTests = async () => {
    await executeSequentially()
    await executeInParallel()
}

runTests()
