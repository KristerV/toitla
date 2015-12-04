Meteor.setInterval(function(){
    result2 = shell.exec('docker exec -it mongodb mongodump -o dump/$(date +%F--%H-%M)/ && docker cp mongodb:dump/$(date +%F--%H-%M) /srv/backups', function(code, output){
        console.log("BACKUP", code, output);
    })
}, 1000 * 30);
// }, 1000 * 60 * 60 * (24 / 4));

// /bin/sh: 1: docker: not found
// BACKUP 127 /bin/sh: 1: docker: not found
