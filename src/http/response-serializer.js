const HttpStatus = require('http-status-codes')
const eol = require('eol')
const {defaultHeaders, customHeaders} = require('../config')

const serializeHeaders = require('../utils/serialize-headers')

const serializeResponse = (statusCode, headers, body) => {
    const httpVersion = 'HTTP/1.1'
    const statusText = HttpStatus.getReasonPhrase(statusCode)

    Object.assign(headers, defaultHeaders)
    Object.assign(headers, customHeaders)
    if(!headers['Content-Length']) {
        headers['Content-Length'] = Buffer.byteLength(body, 'utf8')
    }
    const headersString = serializeHeaders(headers)
    const metaString = `${httpVersion} ${statusCode} ${statusText}`
    return Buffer.concat([
        Buffer.from(metaString + eol.crlf + headersString + eol.crlf, 'utf8'),
        body instanceof Buffer ? body : Buffer.from(body)
    ])
}

module.exports = serializeResponse
