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
            <h3 className="text-white text-center">Users</h3>
            <p className="text-white text-center">Ordered by last visit.</p>
            <div className="max-width paper margin-top">
                <button className="margin mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={this.newUser}>new user</button>
                <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp w100">
                  <thead>
                    <tr>
                      <th className="mdl-data-table__cell--non-numeric">Nimi</th>
                      <th>E-mail</th>
                      <th>rating</th>
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
                </table>
            </div>
        </div>)
    }
})
