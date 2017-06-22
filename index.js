const express = require('express')
const os = require('os')
const path = require('path')

const app = express()


var getLocalIP = function() {
	var netInterfaces = os.networkInterfaces()
	for(ni in netInterfaces) {
		for(var i = 0, len = netInterfaces[ni].length; i < len; ++i) {
			if(netInterfaces[ni][i].family == 'IPv4' && 
			 	netInterfaces[ni][i].internal == false) {
				
				return netInterfaces[ni][i].address
			}
		} 
	}
	return false
}


if(process.argv.length != 3) {
	console.log("Command should have one argument. The file path (relative or absolute")
	process.exit()
}
let filearg = process.argv[2]
if(filearg[0] == '/' || filearg[0] == '~') {
	fullFileName = filearg 
	filename = path.basename(fullFileName)
} else {
	fullFileName = process.cwd() + '/' + filearg
	filename = filearg
}


let localIP = getLocalIP()
if(!localIP) {
	console.log("Could not get local IP. Try and find it on your own.")
}


app.get('/', function (req, res) {
	res.download(fullFileName, filename)
})


app.listen(3000, function () {	
  	console.log('Serving ' + filename + ' on ' + (localIP?localIP:"localIP") + ':3000')
})
