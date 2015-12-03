Meteor.setInterval(function(){
    result2 = Shelljs.exec('docker exec -it mongodb mongodump -o dump/$(date +%F--%H-%M)/ && docker cp mongodb:dump/$(date +%F--%H-%M) /srv/backups', function(code, output){
        console.log("BACKUP", code, output);
    })
}, 1000 * 60 * 60 * (24 / 4));
