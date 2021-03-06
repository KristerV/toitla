import React from 'react';
UserListItem = React.createClass({

    goProfile: function() {
        FlowRouter.go('profile', {userId: this.props.user._id})
    },

    makeManager: function() {
        let userId = this.props.user._id;

        if (this.state == undefined) {
            this.setState({[userId]: 1});
            return;
        }

        let count = this.state[userId];
        this.setState({[userId]: ++count});

        if (count == 9) {
            this.props.user.makeManager();
        }
    },

    goMenu: function(userId) {
        FlowRouter.go('menu', {userId: userId})
    },

    deleteUser(e) {
        var user = this.props.user
        var c = confirm("DELETE FOREVER? User: " + user.getEmail())
        if (!c) return false
        if (user.menuCount) c = confirm("THIS USER HAS MENU ITEMS, DELETE?")
        if (!c) return false
        Meteor.call('Users.deleteUser', user._id)
    },

    render() {
        var user = this.props.user
        var profile = user.profile || {}
        if (user.status && user.status.lastLogin)
            var lastLogin = moment(user.status.lastLogin.date).format("HH:mm - D.MM.YYYY")
        return(<tr
                key={user._id}
                data-userid={user._id}
                className={user.isManager() ? 'bg-grey' : null}>
            <td className="mdl-data-table__cell--non-numeric">
                <ProfileImage user={user} />
            </td>
            <td className="mdl-data-table__cell--non-numeric" onClick={this.makeManager}>
                {profile.name}
            </td>
            <td className="mdl-data-table__cell--non-numeric">
                {user.getEmail()}
            </td>
            <td>
                <button
                    className={"mdl-button mdl-js-button mdl-button--raised "+(user.eligible ? "mdl-button--colored" : null)}
                    onClick={this.goProfile.bind(this, user._id)}
                    name={name}>
                    profile
                </button>
            </td>
            <td>
                <button
                    className={"mdl-button mdl-js-button mdl-button--raised "+(user.menuCount ? "mdl-button--colored" : null)}
                    onClick={this.goMenu.bind(this, user._id)}
                    name={name}>
                    menu - {user.menuCount || 0}
                </button>
            </td>
            <td className="mdl-data-table__cell--non-numeric">
                {lastLogin}
            </td>
            <td>
                <button
                    className="mdl-button mdl-js-button mdl-button--icon"
                    onClick={this.deleteUser}>
                    <i className="material-icons">delete</i>
                </button>
            </td>
        </tr>)
    }
})
