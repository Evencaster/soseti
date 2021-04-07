const serializeHeaders = require('../utils/serialize-headers')

const serializeResponse = (statusCode, headers, body) => {
    const httpVersion = 'HTTP/1.1'
    const statusText = 'LOL'

    headers['Content-Length'] = Buffer.byteLength(body, 'utf8')
    const headersString = serializeHeaders(headers)
    const metaString = `${httpVersion} ${statusCode} ${statusText}`
    return (metaString + '\n' + headersString + '\n' + body)
}

module.exports = serializeResponse