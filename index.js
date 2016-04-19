var fs = require('fs')

var c = {
  line1 : /Running\s(\d+)s\s+test\s+\@\s+http:\/\/([\w\W]+):([\d+]+)\n?/,
  line2 : /(\d+)\s+threads\s+and\s+([\w]+)\s+connections/,
  line4 : /Latency\s+(\d+.\d+)ms\s+(\d+.\d+)ms\s+(\d+.\d+)ms\s+(\d+.\d+.)\s+/,
  //Req/Sec   751.63    398.90     3.23k    66.88%
  line5 : /Req\/Sec\s+(\d+.\d+)\s+(\d+.\d+)\s+(\d+.\d+k)\s+(\d+.\d+.)\s+/,
  // 11845 requests in 2.07s, 1.71MB read
  line6 : /(\d+)\s+requests\s+in\s+(\d+.\d+.),\s+(\d+.\d+MB)\s+read/,
  //Socket errors: connect 0, read 257, write 2, timeout 0
  line7 : /Socket\s+errors:\s+connect\s+(\d+),\s+read\s+(\d+),\s+write\s+(\d+),\s+timeout\s+(\d+)/,
  // Requests/sec:   5722.03
  line8 : /Requests\/sec:\s+(\d+.\d+)/,
  // Transfer/sec:    843.78KB
  line9 : /Transfer\/sec:\s+(\d+.\d+.)/
}

var r = {}


module.exports = function (file) {
  var t = fs.readFileSync('./wrk.log').toString()

  r.time = t.match(c.line1)[1];
  r.host = t.match(c.line1)[2];
  r.port = t.match(c.line1)[3];

  r.threads = t.match(c.line2)[1]
  r.connections = t.match(c.line2)[2]

  // Thread Stats   Avg      Stdev     Max   +/- Stdev
  // Latency   147.35ms   50.36ms 440.07ms   82.79%
  // console.log( t.match(c.line4) )
  r.latency_avg = t.match(c.line4)[1]
  r.latency_stdev = t.match(c.line4)[2]
  r.latency_max = t.match(c.line4)[3]
  r.latency_precent = t.match(c.line4)[4]

  // console.log( t.match(c.line5) )
  r.req_per_second_avg = t.match(c.line5)[1]
  r.req_per_second_stdev = t.match(c.line5)[2]
  r.req_per_second_max = t.match(c.line5)[3]
  r.req_per_second_precent = t.match(c.line5)[4]

  // 11845 requests in 2.07s, 1.71MB read
  r.requests_count = t.match(c.line6)[1]
  r.requests_seconds = t.match(c.line6)[2]
  r.requests_read = t.match(c.line6)[3]

  //Socket errors: connect 0, read 257, write 2, timeout 0
  // console.log( t.match(c.line7) )
  r.connect = t.match(c.line7)[1]
  r.read = t.match(c.line7)[2]
  r.write = t.match(c.line7)[3]
  r.timeout = t.match(c.line7)[4]

  r.requests_per_sec = t.match(c.line8)[1]
  r.transfer_per_sec = t.match(c.line9)[1]

  for(var k in r){
    console.log( k +' = ' + r[k] )
  }
  
  return r;
}