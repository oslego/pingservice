var cronJob = require('cron').CronJob,
    environment = process.env.NODE_ENV || 'development',
    request = require('request'),
    config = {}
    queue = [];
    
switch(environment){
    case 'development':
        // Runs every 2 seconds, everyday
        config.cronTime = '*/2 * * * * *'
        
        // Localhost test ping
        queue.push({
            url: "http://localhost:5000/ping",
            method: "GET"
        })
    break

    case 'production':
        // Runs once every 30 minutes, everyday
        config.cronTime = '0 */30 * * * *'
        
        // REX App API
        queue.push({
            url: "http://api.rexapp.ro/ping",
            method: "GET",
            timeout: 30000
        })
    break
}

function handler(error, response, body){
    if (!error && response && response.statusCode == 200){
        console.log("ping", body)
    }
    else{
        console.log("error", error)
    }
}

new cronJob({
    cronTime: config.cronTime,
    start: true,
    onTick: function(){
        console.log("tick")
        queue.forEach(function(options){
            request(options, handler)
        })
    }
})