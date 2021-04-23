const parseHeaders = require('../utils/parse-headers')

const parseRequest = requestString => {
    const [headersString] = requestString.split('\r\n\r\n')
    const [_,body] = requestString.split(headersString + '\r\n\r\n')
    console.log(typeof body)
    const headersLines = headersString.split('\r\n')
    const meta = headersLines.shift()
    const [method, path, httpVersion] = meta.split(' ')

    const headers = parseHeaders(headersLines)

    return {
        method,
        path,
        httpVersion,
        body,
        headers
    }
}

module.exports = parseRequest