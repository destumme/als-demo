const {AsyncLocalStorage} = require('async_hooks')

const storage = new AsyncLocalStorage()
const ctx = () => storage.getStore()

module.exports = {storage, ctx}