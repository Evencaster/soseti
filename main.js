const net = require('net')

const { Command } = require('commander')
const program = new Command()

program
    .option('-h', '--headers', 'list of custom headers divided by ')
    .option('-f', '--headersFile')
program.version('0.0.1')

program.parse(process.argv)

const { parse } = require('./src/http')

const getHandler = require('./src/handlers/get-handler')
const postHandler = require('./src/handlers/post-handler')
const optionsHandler = require('./src/handlers/options-handler')

const server = net.createServer();

server.on('connection', socket => {
    socket.setEncoding('utf8')
    socket.on('data', data => {
        console.log(data)
        const req = parse(data);
        switch (req.method) {
            case 'GET':
                getHandler(req, socket)
                break
            case 'POST':
                postHandler(req, socket)
                break
            case 'OPTIONS':
                optionsHandler(req, socket)
                break
        }

    })
})

server.listen(1337, '127.0.0.1', () => console.log('Listening'));

