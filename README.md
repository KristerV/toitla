Toitla
======

Kodukokkade repo

Kuidas koodi Live viimine käib?
-----------------------------

```
ssh root@178.62.237.194
cd /srv/homefood_live
git pull
cd /srv/deploy_homefood_live/
mup deploy
```

Kuidas dev serverit kasutada?
-----------------------------

Browseriga saad ligi aadressilt http://toitla.com:4000.

Koodi saad uuendada samuti nagu live serveri puhul, aga asenda 'live' sõnaga 'dev'.

Kuidas backuppe teha?
---------------------

Siiani pole viitsinud midagi korralikku üles seada, praeguseks on siuke script.
```
function backup_homefood {
    server="root@178.62.237.194"
    clear;
    ssh root@178.62.237.194 "mongodump -o /srv/dump/$(date +%F)/";
    mkdir /my/local/backup/dir/$(date +%F);
    scp -r $server:/srv/dump/$(ssh $server 'ls -t /srv/dump | head -1')/* /my/local/backup/dir/$(date +%F);
    exit ;
}
```

Kuidas serveri andmebaasi kohalikku instantsi saada?
----------------------------------------------------

1. Tee backup ja lase see alla
2.
```
    mongorestore -h localhost --port 3001 --db meteor --drop /my/local/backup/dir/$('ls -t /my/local/backup/dir/ | head -1')/homefood/
```

Kuidas serveri andmebaasi tühjaks teha?
---------------------------------------

Oletades, et oled juba serveris
```
mongo homefood
use homefood
db.dropDatabase()
```

Kuidas kohalikku andmebaasi tühjaks teha?
-----------------------------------------

```
meteor reset
```
