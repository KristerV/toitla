Landing = React.createClass({
    goNewOrder() {
        Order.createOrder()
    },
    goLogin() {
        FlowRouter.go('/login')
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("settings")
        var settings = Settings.findOne('landing')
        var sub2 = Meteor.subscribe('allUserData')
        var users = Meteor.users.find().fetch()

        return {
            settings: settings,
            subsReady: subscription.ready() && sub2.ready(),
            users: users
        }
    },

    goToForm() {
        $('html, body').animate({
            scrollTop: $("#orderNow").offset().top - 50
        }, 500);
    },

    goToHowTo() {
        $('html, body').animate({
            scrollTop: $("#howto").offset().top
        }, 500);
    },

    openChat(e) {
        e.preventDefault()
        Tawk_API.maximize();
    },

    render() {
        var settings = this.data.subsReady ? this.data.settings : {}
        settings.eventImages = settings.eventImages || []

        var admins = []
        var chefs = []
        this.data.users.forEach(user => {
            if (Roles.isManager(user._id))
                admins.push(user)
            else if (user.profile && user.profile.image && user.profile.image.filename && user.eligible)
                chefs.push(user)
        })

        return (<div className="landing text-center">
            <section className="mdl-grid bg-temp shadow-bottom">
                <div className="mdl-cell mdl-cell--6-col text-white">
                    <Toitla white={true} shadow={true} size={1.4}/>
                    <h3 style={{fontFamily: "GH"}} className="text-shadow">{T.landing.description()}</h3>
                    <Button label={T.landing.main_button()} raised={true} colored={true} onClick={this.goToHowTo}/>
                </div>
                <div className="mdl-cell mdl-cell--6-col" id="orderNow">
                    <div className="paper center padding" style={{maxWidth: "300px"}}>
                        <h4>{T.order.form.initial_heading()}</h4>
                        <TextInput label={T.order.form.nrPeople()} />
                        <TextInput label={T.order.form.duration()} />
                        <TextInput label={T.order.form.contact_email()} />
                        <Button label={T.order.form.initial_button()} accent={true} raised={true} />
                    </div>
                </div>
            </section>

            <section>
                <div className="landing-degustation center mdl-grid paper no-padding">
                    <div className="mdl-cell mdl-cell--8-col no-margin">
                        <Imgix path="images/landing/features" filename="surprise.jpg" height={230}/>
                    </div>
                    <div className="mdl-cell mdl-cell--4-col">
                        <h5>{T.landing.degustation_title()}</h5>
                        <Button label={T.landing.degustation_button()} raised={true}/>
                    </div>
                </div>
            </section>

            <section>
                <h2>We've served <span style={{fontSize: "2em"}}>72</span> events</h2>
                <h4>Our largest event was <span style={{fontSize: "2em"}}>160</span> people</h4>
                <div className="max-width">
                    {Settings.landing.client_logos.map(filename => {
                        return <div key={filename} className="center" style={{padding: "0 2em" ,width: "8em", height: "6em", display: "inline-block"}}>
                            <Imgix path="/images/landing/clients" filename={filename} fit="clip"/>
                        </div>
                    })}
                </div>
            </section>

            <section>
                <h1>Some of our servings</h1>
                <div className="mdl-grid max-width">
                    {settings.eventImages.map((fullpath, i) => {
                        return <div className="mdl-cell mdl-cell--4-col no-margin" key={i}>
                            <Imgix filename={fullpath} />
                        </div>
                    })}
                </div>
            </section>

            <section id="howto">
                <h1>How to order</h1>
                <ol className="center how-to-order" style={{maxWidth: "400px"}}>
                    <li>Fill form</li>
                    <p className="text-hint">The form asks all the information we need to build you a custom menu.</p>
                    <li>Confirm menu or make changes</li>
                    <p className="text-hint">If you're satisfied with the menu we're all set and will be serving at your event.</p>
                    <li>Bill and feedback</li>
                    <p className="text-hint">We'll send the bill and would love to hear any feedback you may have.</p>
                </ol>
                {this.getOrderNowButton()}
            </section>

            <section>
                <h1>Features</h1>
                <div className="mdl-grid text-left max-width">
                    {Settings.landing.features.map((item, i) => {
                        return <div key={i} className="mdl-cell mdl-cell--6-col mdl-grid paper no-padding">
                            <div className="mdl-cell mdl-cell--4-col no-margin">
                                <Imgix filename={item.img} />
                            </div>
                            <div className="mdl-cell mdl-cell--8-col">
                                <p><b>{item.title}</b></p>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    })}
                </div>
            </section>

            <section>
                <h1>Kokad</h1>
                <p>Kokad valitakse ja valideeritakse käsitsi. Hetkel on neid üle 15-ne.</p>
                <div className="mdl-grid max-width">
                    {chefs.map((user, i) => {
                        return <div className="mdl-cell mdl-cell--2-col padding center" key={i}>
                            <ProfileImage user={user}/>
                            <p>{user.profile.name}</p>
                        </div>
                    })}
                </div>
            </section>

            <section>
                <h1>Meie</h1>
                <p>Alustasime oktoober 2014 blaablaa</p>
                <div className="mdl-grid max-width">
                    {admins.map((user, i) => {
                        return <div className="mdl-cell mdl-cell--2-col padding center" key={i}>
                            <ProfileImage user={user}/>
                            <p>{user.profile.name}</p>
                        </div>
                    })}
                </div>
            </section>

            <section>
                <h1>More questions?</h1>
                <p><a onClick={this.openChat} href="#" >Click here</a> to chat with us or email us at <a target="_blank" href="mailto:team@toitla.com">team@toitla.com</a></p>
                {this.getOrderNowButton()}
            </section>
        </div>)
    },

    getOrderNowButton() {
        return <Button label="Order Now" accent={true} raised={true} onClick={this.goToForm} large={true} />
    }
})
