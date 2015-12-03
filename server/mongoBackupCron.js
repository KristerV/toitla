Meteor.setTimeout(function(){
     Shelljs.exec('sh /srv/toitlalive/private/backup_server_nossh.sh')
}, 1000 * 60*2)// * 60 * 4);
