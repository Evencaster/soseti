const { serialize } = require('../http/response-serializer')

const optionsHandler = (req, socket) => {
    const headers = {}
    socket.write(serialize(200, headers, ''))
}


module.exports = optionsHandler