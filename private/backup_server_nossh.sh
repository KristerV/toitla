echo "BACKUP"
docker exec -it mongodb mongodump -o dump/$(date +%F--%H-%M)/ && docker cp mongodb:dump/$(date +%F--%H-%M) /srv/backups
