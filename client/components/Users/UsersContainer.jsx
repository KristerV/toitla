UsersContainer = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("allUserData")
        var users = Meteor.users.find().fetch()
        return {
            subsReady: subscription.ready(),
            users: users,
        }
    },

    goProfile: function(userId) {
        FlowRouter.go('profile', {userId: userId})
    },

    goMenu: function(userId) {
        FlowRouter.go('menu', {userId: userId})
    },

    render() {
        return(
            <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
              <thead>
                <tr>
                  <th className="mdl-data-table__cell--non-numeric">Nimi</th>
                  <th>E-mail</th>
                  <th>Vet</th>
                  <th>Viimati online</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.data.users.map(function(user){
                    if (user.status && user.status.lastLogin)
                        var lastLogin = moment(user.status.lastLogin.date).format("HH:mm - D.MM.YYYY")
                    return <tr key={user._id}>
                        <td className="mdl-data-table__cell--non-numeric">{user.profile.name}</td>
                        <td>{user.getEmail()}</td>
                        <td>
                            <label className="mdl-checkbox mdl-js-checkbox">
                                <input type="checkbox" className="mdl-checkbox__input" checked={user.profile.vet} readOnly={true}/>
                            </label>
                        </td>
                        <td>{lastLogin}</td>
                        <td>
                            <button className="mdl-button mdl-js-button mdl-button--raised" onClick={this.goProfile.bind(this, user._id)} name={name}>
                                profiil
                            </button>
                        </td>
                        <td>
                            <button className="mdl-button mdl-js-button mdl-button--raised" onClick={this.goMenu.bind(this, user._id)} name={name}>
                                menüü
                            </button>
                        </td>
                    </tr>
                }.bind(this))}
              </tbody>
            </table>
        )
    }
})
