


if [ ! -d "../backups/$(date +%F)" ]; then
    ip="root@188.226.252.230"
    mkdir ../backups
    ssh -t $ip "docker exec -it mongodb mongodump -o dump/$(date +%F)/ && docker cp mongodb:dump/$(date +%F) /srv/backups";
    mkdir ../backups/$(date +%F);
    scp -r $ip:/srv/backups/$(ssh $ip 'ls -t /srv/backups | head -1') ../backups;
fi

mongorestore -h 127.0.0.1 --port 3001 --db meteor --drop ../backups/$(ls -t ../backups/ | head -1)/toitlalive/

### Restoring to server https://github.com/arunoda/meteor-up/issues/816#issuecomment-174391839
## Copy backups from local to server
# scp -r /home/krister/code/backups/2016-06-20/toitlalive/ root@178.62.220.180:/srv/backups/2016-06-20/toitlalive/
