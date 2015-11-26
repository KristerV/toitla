injectTapEventPlugin()

var {
    Paper,
    TextField,
    RaisedButton,
    Tabs,
    Tab,
    Styles,
} = MUI;
var { ThemeManager, LightRawTheme } = Styles;

LoginForm = React.createClass({
    childContextTypes: { muiTheme: React.PropTypes.object, },
    getChildContext() { return { muiTheme: ThemeManager.getMuiTheme(LightRawTheme), } },

    getInitialState() {
        return {
            formType: 'login',
        }
    },

    handleEmailChange(e) {
        this.setState({email: e.target.value.toLowerCase()})
        this.setState({emailError: null})
    },

    handlePasswordChange(e) {
        this.setState({password: e.target.value})
        this.setState({passwordError: null})
    },

    handlePasswordRepeatChange(e) {
        var val = e.target.value
        this.setState({passwordRepeat: val})
        if (this.state.password.length <= val.length && this.state.password !== val)
            this.setState({passwordRepeatError: "Paroolid ei kattu"})
        else
            this.setState({passwordRepeatError: null})
    },

    handleSubmit(e) {
        e.preventDefault()
        this.resetErrors()
        var s = this.state
        var formType = this.state.formType
        if (formType == "register") {
            var error = false
            if (s.password !== s.passwordRepeat) {
                this.setState({passwordRepeatError: "Paroolid ei kattu"})
                error = true
            }
            if (!Security.isEmail(s.email)) {
                this.setState({emailError: "See ei ole väga emaili moodi"})
                error = true
            }
            if (!s.password || s.password.length < 6) {
                this.setState({passwordError: "Parool võiks olla vähemalt 6 tähemärki pikk"})
                error = true
            }
            if (error) return

            Accounts.createUser({email: s.email, password: s.password}, function(err){
                if (err) {
                    if (err.reason == 'Email already exists.')
                        this.setState({emailError: "E-mail on juba olemas"})
                    else
                        sAlert.error(err.reason)
                } else {
                    FlowRouter.go("orders")
                }
            }.bind(this))
        } else if (formType == "login") {
            var error = false
            if (!Security.isEmail(s.email)) {
                this.setState({emailError: "Kindel, et see on su e-mail?"})
                error = true
            }
            if (!s.password) {
                this.setState({passwordError: "Ilma selleta ikka ei saa"})
                error = true
            }
            if (error) return
            Meteor.loginWithPassword(s.email.toLowerCase(), s.password, function(err){
                if (err) {
                    if (err.reason == "User not found")
                        this.setState({emailError: "Kasutajat ei leitud"})
                    else if (err.reason == "Incorrect password")
                        this.setState({passwordError: "Vale parool"})
                    else
                        sAlert.error(err.reason)
                } else {
                    FlowRouter.go("orders")
                }
            }.bind(this))
        }
    },

    handleTabChange(i, tab, c) {
        if (!c || c.isTrusted === false) return
        this.setState({
            formType: c.props.name,
        })
        this.resetErrors()
    },

    resetErrors() {
        this.setState({
            emailError: null,
            passwordError: null,
            passwordRepeatError: null,
        })
    },

    render() {
        var formType = this.state.formType

        var email = <TextField
            floatingLabelText="E-mail"
            ref="email"
            onChange={this.handleEmailChange}
            value={this.state.email}
            errorText={this.state['emailError']} />

        var password = <TextField
            floatingLabelText="Parool"
            ref="password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
            errorText={this.state['passwordError']}>
            <input type="password" />
        </TextField>

        var passwordRepeat = <TextField
            floatingLabelText="Korda parooli"
            ref="passwordRepeat"
            onChange={this.handlePasswordRepeatChange}
            value={this.state.passwordRepeat}
            errorText={this.state['passwordRepeatError']}>
            <input type="password" />
        </TextField>

        var submitLogin = <RaisedButton
            type="submit"
            label="Logi sisse"
            primary={true}/>
        var submitRegister = <RaisedButton
            type="submit"
            label="Registreeri"
            primary={true}/>

        return(
            <Paper className="margin padding layout-login">
                <form onSubmit={this.handleSubmit}>
                    <Tabs onChange={this.handleTabChange}>
                        <Tab label="Logi sisse" name="login">
                            {email}
                            <br/>{password}
                            <br/>{submitLogin}
                        </Tab>
                        <Tab label="Registreeri" name="register">
                            {email}
                            <br/>{password}
                            <br/>{passwordRepeat}
                            <br/>{submitRegister}
                        </Tab>
                    </Tabs>
                </form>
            </Paper>
        )
    }
})
