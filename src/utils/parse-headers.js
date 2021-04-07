const parseHeaders = headersLines => headersLines.reduce((headersObj, h) => {
    const [key, value] = h.split(': ')
    return Object.assign(headersObj, {[key]: value})
}, {})

module.exports = parseHeaders