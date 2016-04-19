var files = require('fs').readdirSync('.')
// console.log(files)

files.forEach(function(file){
  if (/\.log$/.test(file)) {
    console.log(file)
    var obj = require('.')(file)
  }
})