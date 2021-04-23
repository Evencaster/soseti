const net = require('net')
const nextLine = require('next-line')
const eol = require('eol')
const { parse } = require('./src/http')

const getHandler = require('./src/handlers/get-handler')
const postHandler = require('./src/handlers/post-handler')
const optionsHandler = require('./src/handlers/options-handler')

const parseHeaders = require('./src/utils/parse-headers')

const server = net.createServer()

const getBodyOffset = requestHead => Buffer.byteLength(requestHead.join(eol.crlf) + eol.crlf)

const parseRequestHead = data => {
    const dataStr = data.toString('utf8')
    const next = nextLine(dataStr)
    const requestHead = []
    let line
    while (line !== '') {
        line = next()
        requestHead.push(line)
    }
    console.log(requestHead)
    const bodyOffset = getBodyOffset(requestHead)
    requestHead.pop() // remove empty string as last element
    // console.log(requestHead)
    const meta = requestHead.shift()
    const [method, path, protocol] = meta.split(' ')
    const headers = parseHeaders(requestHead)
    const contentLength = Number(headers['Content-Length']) || 0
    const contentType = headers['Content-Type']
    const body = data.subarray(bodyOffset, data.length)
    return {
        method,
        path,
        protocol,
        headers,
        contentLength,
        contentType,
        body
    }
}

server.on('connection', socket => {
    // socket.setEncoding('utf8')
    let req = {}
    let isFirstChunk = true
    socket.on('data', chunk => {
        if(isFirstChunk) {
            isFirstChunk = false
            req = parseRequestHead(chunk)
            // console.log(req.body.toString('utf8'))
        }
        else {
            req.body = Buffer.concat([req.body, chunk])
        }
        console.log(Buffer.byteLength(req.body))
        console.log(req.contentLength)
        if(Buffer.byteLength(req.body) === req.contentLength) {
            isFirstChunk = true
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
        }
    })
})

server.listen(1337, '127.0.0.1', () => console.log('Listening'))

