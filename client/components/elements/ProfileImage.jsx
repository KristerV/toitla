ProfileImage = React.createClass({

    render() {
        var user = this.props.user || {}
        var profile = user.profile || {}
        if (profile.image) {
            return (<Imgix
                    path={profile.image.path}
                    filename={profile.image.filename}
                    circle={true}
                    dpr={this.props.dpr}
                    fit="facearea"
                    facepad="2"
                />)
        } else if (!this.props.disablePlaceholder)
            return <div>
                <i className="material-icons">account_circle</i>
                <p className="text-hint">Pilt lõigatakse näo suuruseks automaatselt - võid laadida ükskõik kui suure pildi.</p>
            </div>
        else
            return <div></div>
    }

})