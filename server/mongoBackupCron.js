Meteor.setTimeout(function(){
     Shelljs.exec('docker exec -it mongodb mongodump -o dump/$(date +%F--%H-%M)/ && docker cp mongodb:dump/$(date +%F--%H-%M) /srv/backups')
}, 1000 * 60*2)// * 60 * 4);
