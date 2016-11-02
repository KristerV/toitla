import React from 'react';
Sign = React.createClass({

    render() {
        var item = this.props.menuitem;
        var backFace = this.props.backFace;
        return(<div key={item._id} className="sign" style={this.props.style}>

            {backFace ?
                <div className="sign-face rotate180 sign-backface">
                    <div className="sign-social">
                        <div className="sign-socialicon-container font-rock-salt">
                            www.toitla.com
                            <div className="sign-socialicon"><Imgix path="images/social_icons" filename="facebook.png" fit="clip"/></div>
                            /toitlacom/reviews
                            <div className="sign-socialicon margin-left-0"><Imgix path="images/social_icons" filename="instagram.png" fit="clip"/></div>
                            @toitlacom
                            <div className="sign-socialicon"><Imgix path="images/social_icons" filename="twitter.png" fit="clip"/></div>
                            @toitla
                        </div>
                    </div>
                    <p className="sign-ingredients text-center"><span className="font-bold">Koostisosad</span>: {item.ingredients}</p>
                    <div className="sign-cut-upper"></div>
                </div>
            : null}

            <div className="sign-face text-center" style={backFace ? {} : {height: "100%"}}>
                <img className="sign-toitla" src="/icons/black-toitla-com.svg"/>
                <div>
                    <div className="sign-profile">
                        <p>Tegi:</p>
                        <div className="sign-profile-image">
                            <ProfileImageContainer userId={item.chefId} dpr={3} disablePlaceholder={true} exp="2" bri="10" shape="square"/>
                        </div>
                        <p className="sign-profile-name">{item.chefName.replace(/ .*/, "")}</p>
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
