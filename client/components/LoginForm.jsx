var ThemeManager = new MUI.Styles.ThemeManager();
injectTapEventPlugin()

var {
    Paper,
    TextField,
    RaisedButton,
    Tabs,
    Tab,
} = MUI;

LoginForm = React.createClass({
    childContextTypes: { muiTheme: React.PropTypes.object, },
    getChildContext() { return { muiTheme: ThemeManager.getCurrentTheme(), } },

    getInitialState() {
        return {
            formType: 'login',
        }
    },

    handleEmailChange(e) {
        this.setState({email: e.target.value})
    },

    handlePasswordChange(e) {
        this.setState({password: e.target.value})
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
            if (s.password !== s.passwordRepeat) {
                this.setState({passwordRepeatError: "Paroolid ei kattu"})
                return false
            }
            Accounts.createUser({email: s.email, password: s.password}, function(err){
                if (err) {
                    if (err.reason == 'Email already exists.')
                        this.setState({emailError: "E-mail on juba olemas"})
                    else
                        sAlert.error(err.reason)
                } else {
                    FlowRouter.go("/ylevaade")
                }
            }.bind(this))
        } else if (formType == "login") {
            Meteor.loginWithPassword(s.email, s.password, function(err){
                if (err) {
                    if (err.reason == "User not found")
                        this.setState({emailError: "Kasutajat ei leitud"})
                    else if (err.reason == "Incorrect password")
                        this.setState({passwordError: "Vale parool"})
                    else
                        sAlert.error(err.reason)
                } else {
                    FlowRouter.go("/ylevaade")
                }
            }.bind(this))
        }
    },

    handleTabChange(i, tab, c) {
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
