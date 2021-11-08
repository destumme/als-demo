const {ctx} = require('../storage')

const run = async (args) => {
    const context = ctx()
    console.log(`request: ${context.uuid} will now take 1000 msecs`)
    await new Promise(resolve => setTimeout(resolve, 1000))
    return 'workflow two'
}

module.exports = {run}