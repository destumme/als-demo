#!/usr/bin/env node
const uuid = require('uuid')
const http = require('http');

const workflowOne = require('./workflow-one')
const workflowTwo = require('./workflow-two')

const {storage} = require('./storage')

const hostname = '127.0.0.1';
const port = 3000;

const context = (req) => {
    const requestUuid = uuid.v4()
    console.log(`starting requst: ${requestUuid} at ${req.url}`)
    return {uuid: requestUuid, url: req.url}
}

const server = http.createServer((req, res) => {
    storage.run(context(req), async () => { 
        const paths = req.url.split('/')
        const [,workflow, args] = paths
    
        let data;
    
        if (workflow === 'one') {    
            data = await workflowOne.run(args)
        } else if (workflow === 'two') {
            data = await workflowTwo.run(args)
        } else {
            data = `Hello World at ${req.url}`
        }

        console.log(`ending request: ${storage.getStore().uuid}`)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(data);
    })
  
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

http.get('http://127.0.0.1:3000/one')
http.get('http://127.0.0.1:3000/two')