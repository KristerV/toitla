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
            user: Meteor.users.findOne(this.props.userId),
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
        return(
        <div>
        <Paper className="margin padding layout-left inline">
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
            <TextField
                floatingLabelText="Koduleht"
                onChange={user.handleTextFieldChange.bind(user)}
                name="profile.homepage"
                value={user.profile.homepage}/>
            <TextField
                floatingLabelText="Ettevõtte nimi"
                onChange={user.handleTextFieldChange.bind(user)}
                name="profile.companyName"
                value={user.profile.companyName}/>
            <TextField
                floatingLabelText="Ettevõtte registrikood"
                onChange={user.handleTextFieldChange.bind(user)}
                name="profile.companyCode"
                value={user.profile.companyCode}/>
            <Checkbox
                label="Olen teavitanud Veterinaar- ja Toiduametit oma koduköögist."
                onCheck={user.handleCheckboxChange.bind(user)}
                name="profile.vet"
                defaultChecked={user.profile.vet}/>
            <sub>Ilma etteovõtte või Vet-ametiga kooskõlastamiseta me kahjuks koostööd teha ei saa. Need protsessid ei ole aga üldse keerulised. Õpetuse kallal veel nokitseme, aga võta ühendust info@toitla.com ja me juhendame su mõnusalt läbi.</sub>
        </Paper>
    </div>)
    }
})
