const { serialize } = require('../http')

const optionsHandler = (req, socket) => {
    const headers = {
        Allow: "OPTIONS, GET, POST"
    }
    socket.write(serialize(200, headers, ''))
}


module.exports = optionsHandler