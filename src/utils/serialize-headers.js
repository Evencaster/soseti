const serializeHeaders = headers => {
    let headersString = ''
    for(let h in headers) {
        headersString += h + ': ' + headers[h] + '\r\n'
    }
    return headersString
}

module.exports = serializeHeaders