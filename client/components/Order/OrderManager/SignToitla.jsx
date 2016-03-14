SignToitla = React.createClass({

    render() {
        return <div className="sign-page center">
            <div className="sign">
                <div className="sign-face text-center" style={{height: "100%"}}>
                    <div style={{marginTop: "2cm"}}>
                        <h1 className="mainsign-title">Kodukokkade<br/>parimad palad</h1>
                    </div>
                    <div className="mainsign-profiles">
                        {this.props.chefs ? this.props.chefs.map((user, i) => {
                            return <div className={`mainsign-toitla-profile mainsign-toitla-profile-${i}`} key={user._id}>
                                <ProfileImageContainer userId={user._id} dpr={3} disablePlaceholder={true}/>
                                <p>{user.name}</p>
                            </div>
                        }) : null}
                    </div>
                    <div style={{marginBottom: "2cm"}}>
                        <h2 className="sign-title" style={{position: "relative", top: "0.5cm"}}>toob teieni</h2>
                        <h2><img className="mainsign-toitla" src="/icons/black-toitla.svg"/><span style={{position: "relative", top: "1cm", left: "-0.5cm"}}>.com</span></h2>
                    </div>
                </div>
            </div>
        </div>
    }

})
