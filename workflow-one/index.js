const {ctx} = require('../storage')

const run = async (args) => {
    const context = ctx()
    console.log(`request: ${context.uuid} will now take 5000 msecs`)
    await new Promise(resolve => setTimeout(resolve, 5000))
    return 'workflow one'
}

module.exports = {run}