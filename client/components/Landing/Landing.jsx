Landing = React.createClass({
    goNewOrder() {
        Order.createOrder()
    },
    goLogin() {
        FlowRouter.go('/login')
    },
    render() {
        return (<div className="landing">
            <section className="mdl-grid landing-hero text-center">
                <div className="mdl-cell mdl-cell--6-col">
                    Tekst ja nupp
                </div>
                <div className="mdl-cell mdl-cell--6-col">
                    <div className="paper center padding">
                        <TextInput label="üks" />
                        <TextInput label="kaks" />
                        <TextInput label="kolm" />
                        <TextInput label="neli" />
                        <Button/>
                    </div>
                </div>
            </section>
            <section>
                <h1>Degusteerimine</h1>
            </section>
            <section>
                <h1>We've served XX events</h1>
                <p>Ranging from 10 to 160 people</p>
                <h3>Clients include</h3>
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
