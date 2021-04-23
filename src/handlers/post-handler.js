const fs = require('fs')
const path = require('path')
const config = require('../config')
const { serialize } = require('../http')

const postHandler = (req, socket) => {
    const data = Buffer.from(req.body)
    const filePath = path.join(__dirname, '../../static', req.path)
    fs.writeFile(filePath, data, (err) => {
        if(err) {
            socket.write(serialize(500, {}, err.message))
            return
        }
        socket.write(serialize(201, {}, ''))
    })
}

module.exports = postHandler