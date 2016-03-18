SignToitla = React.createClass({

    render() {
        return <div className="sign-page center landscape">
            <div className="sign" style={{width: "50%"}}>
                <div className="sign-face text-center" style={{height: "100%"}}>
                    <h2 className="mainsign-title">Kodukokkade<br/>parimad palad</h2>
                    <div className="mainsign-profiles w100">
                        {this.props.chefs ? this.props.chefs.map((user, i) => {

                            return <div className="mainsign-toitla-profile center" key={user._id}>
                                <ProfileImageContainer userId={user._id} dpr={3} disablePlaceholder={true}/>
                                <p style={{marginTop: "2mm"}}>{user.name.replace(/ .*/, "")}</p>
                            </div>

                        }) : null}
                    </div>
                    <div style={{marginBottom: "0.7cm"}}>
                        <h2 style={{position: "relative", left: "-1.3cm", top: "0.8cm"}}>toob teieni</h2>
                        <h2><img className="mainsign-toitla" src="/icons/black-toitla.svg"/><span className="mainsign-toitla-accompanytext">.com</span></h2>
                    </div>
                </div>
            </div>
            <div className="sign" style={{width: "50%"}}>
                <div className="sign-face text-center" style={{height: "100%"}}>
                </div>
            </div>
            <div className="sign-cut"></div>
        </div>
    }

})
