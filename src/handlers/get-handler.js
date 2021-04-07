const fs = require('fs')
const path = require('path')
const { serialize } = require('../http')
const getContentType = require('../utils/get-content-type')

const getHandler = (req, socket) => {
    const filePath = path.join(__dirname, '../../static', req.path)
    fs.readFile(filePath, 'utf8', (err, data) => {
        if(err) {
            const res = serialize(404, {}, 'Not found')
            socket.write(res)
            return
        }
        console.log(data)
        const headers = {
            'Content-Type': getContentType(path.extname(filePath)),
        }
        const res = serialize(200, headers, data)
        socket.write(res)
    })
}

module.exports = getHandler