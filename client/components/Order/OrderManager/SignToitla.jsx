SignToitla = React.createClass({

    render() {
        return <div className="sign-page center">
            <div className="sign">
                <div className="sign-face text-center" style={{height: "100%"}}>
                    <div className="sign-spacer"></div>
                    <div>
                        <h1 className="mainsign-title">Kodukokkade<br/>parimad palad</h1>
                    </div>
                    <div className="sign-spacer"></div>
                    <div>
                        <h2 className="sign-title" style={{position: "relative", top: "0.5cm"}}>toob teieni</h2>
                        <h2><img className="mainsign-toitla" src="/icons/black-toitla.svg"/><span style={{position: "relative", top: "1cm", left: "-0.5cm"}}>.com</span></h2>
                    </div>
                    <div className="sign-spacer"></div>
                </div>
            </div>
        </div>
    }

})
