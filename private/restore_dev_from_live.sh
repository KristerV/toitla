cd /srv/backups
docker exec -it mongodb mongodump -o dump/$(date +%F)/
docker cp mongodb:dump/$(date +%F) /srv/backups
docker exec -it mongodb mongorestore --db toitladev --drop dump/$(ls -t ./ | head -1)/toitlalive/
