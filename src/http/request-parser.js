const parseRequest = requestString => {

    const [headersString, body] = requestString.split('\r\n\r\n')

    const headersLines = headersString.split('\r\n')
    const meta = headersLines.shift()
    const [method, path, httpVersion] = meta.split(' ')



    return {
        method,
        path,
        httpVersion,
        body,
        headers
    }
}

module.exports = parseRequest