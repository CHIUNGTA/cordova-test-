const consolere = require('console-remote-client').connect({
    server: 'https://console.re', // optional, default: https://console.re
    channel: 'mentha5681_test_app' // required
  });

function remoteLog(title, message) {
    let logContent = title
    if(typeof message === 'object') {
       logContent = `${title}:${JSON.stringify(message)}`
    } else if(message !== undefined){
       logContent = `${title}:${message}`
    }
    console.re.log(logContent)
}


export default {
    remoteLog
  }