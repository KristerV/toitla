Meteor.methods({
  sendEmail: function(from, to, subject, html) { 
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
            console.log("Email error: " + error)
          } else {
            console.log("Email sent")
          }
        }
      )

  }
});
