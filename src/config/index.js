const path = require('path')
const { Command } = require('commander')
const program = new Command()

program
    .option('-h, --headers <file>', 'Json file with headers')

program.version('1.0.0')

program.parse(process.argv)



const filesDir = path.join(__dirname, '../../static')
const rootDir = path.join(__dirname, '../..')


const customHeaders = program.opts().headers ? require(path.join(rootDir, program.opts().headers)) : {}

Object.keys(customHeaders).length !== 0 &&
customHeaders.constructor === Object &&
console.log(`Using custom headers ${JSON.stringify(customHeaders, null, '\t')}`)

const defaultHeaders = {

}

module.exports = {
    customHeaders,
    filesDir,
    defaultHeaders,
}