Landing = React.createClass({
    goNewOrder() {
        Order.createOrder()
    },
    goLogin() {
        FlowRouter.go('/login')
    },

    componentDidMount() {
        // HACK: fire imgix lazyload, as otherwise it may not load images
        $('body').scrollTop($('body').offset().top + 1)
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
        console.log("Landing.openChat")
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
                    <h3 style={{fontFamily: "GH"}} className="text-shadow">{T.landing.hero.description()}</h3>
                    <Button label={T.landing.ordernow_button()} raised={true} colored={true} onClick={this.goToHowTo}/>
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
                        <h5>{T.landing.sampleBox.title()}</h5>
                        <Button label={T.landing.sampleBox.button()} raised={true}/>
                    </div>
                </div>
            </section>

            <section>
                <h2 dangerouslySetInnerHTML={T.landing.score.nr_events({dangerous: true})}></h2>
                <h4 dangerouslySetInnerHTML={T.landing.score.nr_people({dangerous: true})}></h4>
                <div className="max-width">
                    {Settings.landing.client_logos.map(filename => {
                        return <div key={filename} className="center" style={{padding: "0 2em" ,width: "8em", height: "6em", display: "inline-block"}}>
                            <Imgix path="/images/landing/clients" filename={filename} fit="clip"/>
                        </div>
                    })}
                </div>
            </section>

            <section>
                <h1>{T.landing.score.gallery()}</h1>
                <div className="mdl-grid max-width">
                    {settings.eventImages.map((fullpath, i) => {
                        return <div className="mdl-cell mdl-cell--4-col no-margin" key={i}>
                            <Imgix filename={fullpath} />
                        </div>
                    })}
                </div>
            </section>

            <section id="howto">
                <h1>{T.landing.howto.title()}</h1>
                <ol className="center how-to-order" style={{maxWidth: "400px"}}>
                    <li>{T.landing.howto.first()}</li>
                    <h6 className="text-hint">{T.landing.howto.first_sub()}</h6>
                    <li>{T.landing.howto.second()}</li>
                    <h6 className="text-hint">{T.landing.howto.second_sub()}</h6>
                    <li>{T.landing.howto.third()}</li>
                    <h6 className="text-hint">{T.landing.howto.third_sub()}</h6>
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
                                <h5>{T.landing.features[item.title]()}</h5>
                                <p>{T.landing.features[item.text]()}</p>
                            </div>
                        </div>
                    })}
                </div>
            </section>

            <section>
                <h1>{T.landing.users.chefs()}</h1>
                <h5>{T.landing.users.chefs_text()}</h5>
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
                <h1>{T.landing.users.team()}</h1>
                <h5>{T.landing.users.team_text()}</h5>
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
                <h2>{T.landing.final.title()}</h2>
                <h6 dangerouslySetInnerHTML={T.landing.final.text({dangerous: true})}></h6>
                {this.getOrderNowButton()}
            </section>
        </div>)
    },

    getOrderNowButton() {
        return <Button label={T.landing.ordernow_button()} accent={true} raised={true} onClick={this.goToForm} large={true} />
    }
})
