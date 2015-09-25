Accounts.onCreateUser(function(options, user) {
  var emailHTML = "<p> -------------- Uus kasutaja -------------- </p><p>Email: " + user.emails[0].address + "</p>"
  Email.send('teavitus@toitla.com', 'conv.1nho427pw5qh36@fleep.io', 'Teavitus tellimusest', emailHTML)
  return user
})
