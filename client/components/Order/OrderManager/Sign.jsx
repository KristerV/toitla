Sign = React.createClass({

    render() {
        var item = this.props.menuitem
        var backFace = this.props.backFace
        return(<div key={item._id} className="sign" style={this.props.style}>

            {backFace ?
                <div className="sign-face">
                    <div className="sign-cut"></div>
                </div>
            : null}

            <div className="sign-face text-center" style={backFace ? {} : {height: "100%"}}>
                <div>
                    <img className="sign-toitla" src="/icons/black-toitla.svg"/>
                    <div className="sign-profile">
                        <div className="sign-profile-image">
                            <ProfileImageContainer userId={item.chefId} dpr={3} disablePlaceholder={true}/>
                        </div>
                        <p>{item.chefName}</p>
                    </div>
                </div>
                <div className="sign-spacer"></div>
                <div>
                    <h3 className="sign-title">{item.title}</h3>
                </div>
                <div>
                    {this.getTags()}
                    <p className="sign-ingredients"><b>Koostisosad</b>: {item.ingredients}</p>
                </div>
                <div className="sign-spacer"></div>
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
