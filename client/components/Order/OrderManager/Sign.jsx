Sign = React.createClass({

    render() {
        var item = this.props.menuitem
        var backFace = this.props.backFace
        return(<div key={item._id} className="sign" style={this.props.style}>

            {backFace ?
                <div className="sign-face rotate180 sign-backface">
                    {/*this.getTags()*/}
                    <div className="spacer"></div>
                    <div>
                        <div className="sign-socialicon-container">
                            <div className="sign-socialicon"><Imgix path="images/social_icons" filename="instagram.png" fit="clip"/></div>
                            <div className="sign-socialicon"><Imgix path="images/social_icons" filename="facebook.png" fit="clip"/></div>
                            <div className="sign-socialicon"><Imgix path="images/social_icons" filename="twitter.png" fit="clip"/></div>
                        </div>
                        <h1 className="text-center">#toitla</h1>
                    </div>
                    <p className="sign-ingredients text-center"><b>Koostisosad</b>: {item.ingredients}</p>
                    <div className="sign-cut-upper"></div>
                </div>
            : null}

            <div className="sign-face text-center" style={backFace ? {} : {height: "100%"}}>
                <img className="sign-toitla" src="/icons/black-toitla.svg"/>
                <div>
                    <div className="sign-profile">
                        <div className="sign-profile-image">
                            <ProfileImageContainer userId={item.chefId} dpr={3} disablePlaceholder={true}/>
                        </div>
                        <p>{item.chefName}</p>
                    </div>
                </div>
                <h3 className="sign-title">{item.title}</h3>
                <div className="spacer"></div>
                <div className="sign-cut"></div>
            </div>
        </div>)
    },

    getTags() {
        var item = this.props.menuitem
        if (!item.tags || !item.tags.length) return

        var tags = []
        item.tags.forEach(tag => {
            tags.push(<p key={tag.name} className="sign-tag" style={{color: tag.color}}>{tag.label}</p>)
        })

        return <div className="sign-tags">{tags}</div>
    }

})
