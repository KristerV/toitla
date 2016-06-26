import React from 'react';
import ReactDOM from 'react-dom';

LoginForm = React.createClass({

    getInitialState() {
        return {
            emailDomain: null,
        }
    },

    sendLink(e) {
        e.preventDefault()
        var email = e.target[0].value
        if (Security.isEmail(email)) {
            Meteor.call('sendEmailLogin', email)
            $('input#email').val("")
            var emailDomain = email.split("@")[1]
            this.setState({emailDomain: emailDomain})
            this.showSent()
        } else {
            this.showNotEmail()
        }
    },

    showSent() {
        $('button#login').addClass('button-login-sent')
        Meteor.setTimeout(function () {
            $('button#login').removeClass('button-login-sent')
        }, 5000);
    },

    showNotEmail() {
        $('button#login').addClass('button-not-email')
        Meteor.setTimeout(function () {
            $('button#login').removeClass('button-not-email')
        }, 5000);
    },

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.email.refs.textinput).focus()
    },

    render() {
        return(<div className="mdl-grid">
            <LandingNavbar/>
            <div className="mdl-cell mdl-cell--4-cell max-width">
                <h4 className="text-white text-center">Chefs only zone</h4>
                <form className="paper padding text-center" onSubmit={this.sendLink}>
                    <h5>What's your email?</h5>
                    <TextInput
                        id="email"
                        ref="email"
                    />
                    <button id="login" type="submit" className="button-login-send mdl-button mdl-js-button mdl-button--raised mdl-button--accent w100 mdl-js-ripple-effect"><span>login / register</span></button>
                    {this.state.emailDomain ? <p style={{paddingTop: "1em"}}>Now go check your email at <a target="_blank" href={"http://" + this.state.emailDomain}>{this.state.emailDomain}</a></p> : null}
                </form>
                <p className="text-white text-center margin">
                    Passwords are not used here. Instead, you'll get an access link in your email. No need to remember another password.
                </p>
            </div>
        </div>)
    }
})
