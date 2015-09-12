var ThemeManager = new MUI.Styles.ThemeManager();
injectTapEventPlugin()

var {
    Paper,
    TextField,
    RaisedButton,
    Checkbox,
} = MUI;

ProfileForm = React.createClass({
    childContextTypes: { muiTheme: React.PropTypes.object, },
    getChildContext() { return { muiTheme: ThemeManager.getCurrentTheme(), } },

    getInitialState() {
        return {}
    },

    getDefaultProps() {
        return {}
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            user: Meteor.user(),
        }
    },

    handleTextFieldChange(e) {
        var name = e.target.name
        var value = e.target.value
        var userId = Meteor.userId()
        Meteor.users.update(userId, {$set: {[name]: value}})
    },

    handleCheckboxChange(e, check) {
        TODO()
    },

    logout(e) {
        Meteor.logout(function(){
            FlowRouter.go("/")
        });
    },

    render() {
        if (!this.data.user)
            return <div>Loading...</div>
        var user = this.data.user || {}
        user.profile = user.profile || {}
        if (user.emails && user.emails[0] && user.emails[0].address)
            var email = user.emails[0].address
        user.emails = user.emails || {}
        return(<Paper className="margin padding">
            <RaisedButton
                label="Logi välja"
                onClick={this.logout}/>
            <h2>{email}</h2>
            <TextField
                floatingLabelText="Nimi"
                onChange={user.handleTextFieldChange.bind(user)}
                name="profile.name"
                value={user.profile.name}/>
            <TextField
                floatingLabelText="Aadress"
                onChange={user.handleTextFieldChange.bind(user)}
                name="profile.address"
                value={user.profile.address}/>
            <TextField
                floatingLabelText="Telefoni number"
                onChange={user.handleTextFieldChange.bind(user)}
                name="profile.tel"
                value={user.profile.tel}/>
            <Checkbox
                label="Olen oma kodukokkamise tegevuse kooskõlastanud Veterinaar- ja Toiduametiga"
                onCheck={user.handleCheckboxChange.bind(user)}
                name="profile.vet"
                defaultChecked={user.profile.vet}/>
            <Checkbox
                label="Mul on arve esitamise võimalus"
                onCheck={user.handleCheckboxChange.bind(user)}
                name="profile.billing"
                defaultChecked={user.profile.billing}/>
        </Paper>)
    }
})
