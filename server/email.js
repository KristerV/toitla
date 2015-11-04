Email = {
  send: function(from, to, subject, html) {
      HTTP.post('https://mandrillapp.com/api/1.0/messages/send.json',
        {
          "data": {
            "key": process.env.MANDRILL_KEY,
            "message": {
              "from_email": from,
              "subject": subject,
              "html": html,
              "to": [
                {
                  "email": to,
                  "type": "to"
                }
              ],
            }
          }
        },
        function(error, result) {
          if(error){
            console.error("Email error: " + error)
          } else {
            console.info("Email sent")
          }
        }
      )
  }
}

Meteor.methods({
  sendEmail:function(from, to, subject, html){
    check(from, String)
    check(to, String)
    check(subject, String)
    check(html, String)
    if (Roles.userIsInRole(this.userId, 'manager')) {
      Email.send(from, to, subject, html)
    } else {
      throw new Meteor.Error("You're not allowed to send email")
    }

  }
});
