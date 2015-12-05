// taken mostly from https://github.com/meteor/meteor/blob/master/packages/accounts-password/password_server.js#L573

Accounts.sendLoginEmail = function(address){

  if (! address) {
    throw new Meteor.Error("No email provided")
  } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(address)) {
    throw new Meteor.Error("Provided string is not an email")
  }

  var user = Accounts.findUserByEmail(address)

  if (! user) {
    Accounts.createUser({email: address})
    user = Accounts.findUserByEmail(address)
  }

  var tokenRecord = {
    token: Random.secret(),
    address: address,
    when: new Date()
  };

  Meteor.users.update(
    { _id: user._id },
    { $push: {'services.email.verificationTokens': tokenRecord } }
  );

  Meteor._ensure(user, 'services', 'email');

  if (!user.services.email.verificationTokens) {
    user.services.email.verificationTokens = [];
  }

  user.services.email.verificationTokens.push(tokenRecord);

  var loginUrl = Accounts.urls.login(tokenRecord.token);

  var html = ''
  if (user.profile) {
    html += '<p>Hey ' + user.profile.name + ',</p>'
    html += "<p>To login, just follow this link.</p>"
  }
  else {
    html += '<p>Hey there,</p>'
    html += "<p>To register, just follow this link. A user wil be created for you.</p>"
  }

  html += '<p><a target="_blank" href="'+loginUrl+'">'+loginUrl+'</a></p>'

  html += '<p>All the best, Toitla</p>'

  Email.send(null, address, 'Toitla login link', html)
};
