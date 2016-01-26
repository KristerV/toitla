UsersTable = React.createClass({

    newUser(e) {
        var email = prompt("What's the users email?")
        if (!email) return false
        Meteor.call("Users--createNewUser", email, function(err, userId){
            if (err)
                console.error(err)
            else
                FlowRouter.go("profile", {userId: userId})
        })
    },

    render() {
        return(<div>
        <button className="margin mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={this.newUser}>new user</button>
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp max-width">
          <thead>
            <tr>
              <th className="mdl-data-table__cell--non-numeric">Nimi</th>
              <th>E-mail</th>
              <th>rating</th>
              <th>Vet</th>
              <th></th>
              <th></th>
              <th>Viimati online</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(function(user, i){
                return <UserListItem key={i} user={user}/>
            })}
          </tbody>
        </table></div>)
    }
})
