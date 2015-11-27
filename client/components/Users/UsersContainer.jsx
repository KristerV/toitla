UsersContainer = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("allUserData")
        var users = Meteor.users.find({}, {sort: {'status.lastLogin.date': -1}}).fetch()
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
                {this.data.users.map(function(user){
                    var profile = user.profile || {}
                    if (user.status && user.status.lastLogin)
                        var lastLogin = moment(user.status.lastLogin.date).format("HH:mm - D.MM.YYYY")
                    return <tr key={user._id}>
                        <td className="mdl-data-table__cell--non-numeric">{profile.name}</td>
                        <td>{user.getEmail()}</td>
                        <td>
                            <TextInput
                                value={user.manualRating}
                                name="manualRating"
                                onBlur={user.handleTextFieldChange.bind(user)}
                                style={{width: "20px"}}/>
                        </td>
                        <td>
                            <label className="mdl-checkbox mdl-js-checkbox">
                                <input type="checkbox" className="mdl-checkbox__input" checked={profile.vet} readOnly={true}/>
                            </label>
                        </td>
                        <td>
                            <button className={"mdl-button mdl-js-button mdl-button--raised "+(user.eligible ? "mdl-button--colored" : null)} onClick={this.goProfile.bind(this, user._id)} name={name}>
                                profile
                            </button>
                        </td>
                        <td>
                            <button className={"mdl-button mdl-js-button mdl-button--raised "+(user.menuCount ? "mdl-button--colored" : null)} onClick={this.goMenu.bind(this, user._id)} name={name}>
                                menu - {user.menuCount}
                            </button>
                        </td>
                        <td>{lastLogin}</td>
                    </tr>
                }.bind(this))}
              </tbody>
            </table>
        )
    }
})
