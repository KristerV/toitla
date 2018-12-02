# Toitla

The website and inner workings of toitla.com

If you'd like to use a system like this, you need to ask for permission first. All rights are reserved.

## Run locally

1. `meteor npm i`
1. `cat /srv/deploy_toitlalive/settings.json` on the server and put it into `settings.json` locally.
1. `meteor run --settings settings.json`

*Note: AWS credintials can also be wrong, the "access denied" error still lets you run the server.*

**Once running**

- When logging into the service - emails are displayed in the console.
- To become admin run these commands:
    - `meteor shell`
    - `Meteor.users.update({}, {$push: {roles: 'manager'}})`
    - (further users are made admin by clicking on their name 9 times)
- OR if you want to download and run live database run `bash private/restore_local_from_live.sh`
    - You must have `mongorestore` installed (probably called `mongo-tools`)
    - The restore process didn't actually work last time..

## Deploy

1. `ssh toitla@telli.toitla.com`
1. `cd /srv/toitlalive && git pull`
1. `cd /srv/deploy_toitlalive && mup deploy`
