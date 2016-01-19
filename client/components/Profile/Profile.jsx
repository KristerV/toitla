
Profile = React.createClass({

    logout(e) {
        Meteor.logout(function(){
            FlowRouter.go("/")
        });
    },

    changeEmail(e) {
        this.props.user.changeEmail(e.target.value)
    },

    render() {
        if (!Roles.userIsInRole(Meteor.userId(), 'manager') && this.props.user._id !== Meteor.userId())
            return <div>Not allowed</div>
        var user = this.props.user || {}
        user.profile = user.profile || {}

        var manager = Meteor.user().isManager()

        return(
        <div className="mdl-grid">
            <div className="paper padding mdl-cell mdl-cell--4-col">
                <TextInput
                    label="Email"
                    onBlur={this.changeEmail}
                    value={user.getEmail()}
                    disabled={!manager}
                />
                <TextInput
                    label="Name"
                    onBlur={user.handleTextFieldChange.bind(user)}
                    name="profile.name"
                    value={user.profile.name}
                />
                <TextInput
                    label="Aadress"
                    onBlur={user.handleTextFieldChange.bind(user)}
                    name="profile.address"
                    value={user.profile.address}/>
                <TextInput
                    label="Telefoni number"
                    onBlur={user.handleTextFieldChange.bind(user)}
                    name="profile.tel"
                    value={user.profile.tel}/>
                <TextInput
                    label="Koduleht"
                    onBlur={user.handleTextFieldChange.bind(user)}
                    name="profile.homepage"
                    value={user.profile.homepage}/>
            </div>
            <div className="paper padding mdl-cell mdl-cell--4-col">
                <TextInput
                    label="Ettevõtte nimi"
                    onBlur={user.handleTextFieldChange.bind(user)}
                    name="profile.companyName"
                    value={user.profile.companyName}/>
                <TextInput
                    label="Ettevõtte registrikood"
                    onBlur={user.handleTextFieldChange.bind(user)}
                    name="profile.companyCode"
                    value={user.profile.companyCode}/>
                <Checkbox
                    label="Olen teavitanud Veterinaar- ja Toiduametit oma koduköögist."
                    onChange={user.handleCheckboxChange.bind(user)}
                    name="profile.vet"
                    defaultChecked={user.profile.vet}/>
                <br/>
                <sub>Ilma etteovõtte või Vet-ametiga kooskõlastamiseta me kahjuks koostööd teha ei saa. Need protsessid ei ole aga üldse keerulised. Õpetuse kallal veel nokitseme, aga võta ühendust info@toitla.com ja me juhendame su mõnusalt läbi.</sub>
            </div>
            <button className="margin mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.logout}>Log out</button>
    </div>)
    }
})
