Landing = React.createClass({
    goNewOrder() {
        Order.createOrder()
    },
    goLogin() {
        FlowRouter.go('/login')
    },
    render() {
        var clientLogos = Settings.landing.client_logos
        return (<div className="landing">
            <section className="mdl-grid text-center bg-temp shadow-bottom">
                <div className="mdl-cell mdl-cell--6-col text-white">
                    <Toitla white={true} shadow={true} size={1.4}/>
                    <h3 style={{fontFamily: "GH"}} className="text-shadow">{T.landing.description()}</h3>
                    <Button label={T.landing.main_button()} raised={true}/>
                </div>
                <div className="mdl-cell mdl-cell--6-col">
                    <div className="paper center padding" style={{maxWidth: "300px"}}>
                        <h4 className="text-center">{T.order.form.initial_heading()}</h4>
                        <TextInput label={T.order.form.nrPeople()} />
                        <TextInput label={T.order.form.duration()} />
                        <TextInput label={T.order.form.contact_email()} />
                        <Button label={T.order.form.initial_button()} accent={true} raised={true} />
                    </div>
                </div>
            </section>

            <section>
                <div className="landing-degustation center mdl-grid paper no-padding">
                    <div className="mdl-cell mdl-cell--8-col no-margin bg-temp"></div>
                    <div className="mdl-cell mdl-cell--4-col text-center">
                        <h5>{T.landing.degustation_title()}</h5>
                        <Button label={T.landing.degustation_button()} raised={true}/>
                    </div>
                </div>
            </section>

            <section className="text-center max-width">
                <h2>We've served <span style={{fontSize: "2em"}}>72</span> events</h2>
                <h4>Our largest event was <span style={{fontSize: "2em"}}>160</span> people</h4>
                <div className="mdl-grid text-center">
                    {clientLogos.map(filename => {
                        return <div className="mdl-cell--2-col center" style={{padding: "0 2em"}}>
                            <Imgix path="/images/landing/clients" filename={filename} fit="clip"/>
                        </div>
                    })}
                </div>
            </section>

            <section>
                <h1>Event1</h1>
            </section>

            <section>
                Fans
            </section>

            <section>
                <h1>How to order</h1>
                <ol>
                    <li>Fill form</li>
                    <p className="text-hint">We construct the menu</p>
                    <li>Confirm / change menu</li>
                    <p className="text-hint">We serve at your event</p>
                    <li>Bill / Feedback</li>
                    <p className="text-hint">Love to hear about your experience</p>
                </ol>
            </section>

            <section>
                <h1>Features</h1>
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--4-col mdl-grid">
                        <div className="mdl-cell mdl-cell--6-col">PILT</div>
                        <div className="mdl-cell mdl-cell--6-col">Pikk tekst kuidas töötab</div>
                    </div>
                </div>
            </section>

            <section>
                <h1>Kokad</h1>
            </section>

            <section>
                <h1>Meie</h1>
            </section>

            <section>
                <h2>Footer</h2>
            </section>
        </div>)
    }
})
