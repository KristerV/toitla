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
        var settings = this.data.settings || {}
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
            <section className="mdl-grid shadow-bottom relative imgix-fluid imgix-fluid-bg" data-src={Settings.landing.mainImage}>
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
                    <h6 className="text-hint">The form asks all the information we need to build you a custom menu.</h6>
                    <li>Confirm menu or make changes</li>
                    <h6 className="text-hint">If you're satisfied with the menu we're all set and will be serving at your event.</h6>
                    <li>Bill and feedback</li>
                    <h6 className="text-hint">We'll send the bill and would love to hear any feedback you may have.</h6>
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
                                <h5>{item.title}</h5>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    })}
                </div>
            </section>

            <section>
                <h1>Kokad</h1>
                <h5>Kokad valitakse ja valideeritakse käsitsi. Hetkel on neid üle 15-ne.</h5>
                <div className="mdl-grid max-width">
                    {chefs.map((user, i) => {
                        return <div className="mdl-cell mdl-cell--2-col padding center" key={i}>
                            <ProfileImage user={user}/>
                            <h5>{user.profile.name.replace(/ .*/, "")}</h5>
                        </div>
                    })}
                </div>
            </section>

            <section>
                <h1>Meie</h1>
                <h5>Alustasime oktoober 2014 blaablaa</h5>
                <div className="mdl-grid max-width">
                    {admins.map((user, i) => {
                        return <div className="mdl-cell mdl-cell--2-col padding center" key={i}>
                            <ProfileImage user={user}/>
                            <h5>{user.profile.name.replace(/ .*/, "")}</h5>
                        </div>
                    })}
                </div>
            </section>

            <section>
                <h2>More questions?</h2>
                <h6><a onClick={this.openChat} href="#" >Click here</a> to chat with us or email us at <a target="_blank" href="mailto:team@toitla.com">team@toitla.com</a></h6>
                {this.getOrderNowButton()}
            </section>
        </div>)
    },

    getOrderNowButton() {
        return <Button label="Order Now" accent={true} raised={true} onClick={this.goToForm} large={true} />
    }
})
