LandingNavbar = React.createClass({

    changeLanguage() {
        var now = localStorage.getItem('locale') === 'et' ? 'en' : 'et'
        Meteor.call('User--setLanguage', now, function(){
            window.location.reload()
        })
    },

    goHome() {
        FlowRouter.go('/')
    },

    goLogin() {
        FlowRouter.go('login')
    },

    render() {
        if (Meteor.userId()) return <div></div>

        var alreadyHome = FlowRouter.current().path === '/'
        var alreadyLogin = FlowRouter.current().route.name === 'login'
        var est = T.currentLocale === 'et'

        return (<div className="landing-navbar">
            {alreadyHome ? null :
                <h6 onClick={this.goHome}>{T.landing.navbar.home()}</h6>
            }
            {alreadyLogin ? null :
                <h6 onClick={this.goLogin}>{T.landing.navbar.register()}</h6>
            }
            {alreadyLogin ? null :
                <h6 onClick={this.goLogin} className="border">{T.landing.navbar.login()}</h6>
            }
            <h6 onClick={this.changeLanguage}>
                {est ?
                    <span><u>EST</u> / ENG</span>
                :
                    <span>EST / <u>ENG</u></span>
                }
            </h6>
        </div>)
    }

})