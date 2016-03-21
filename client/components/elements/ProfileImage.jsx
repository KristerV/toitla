ProfileImage = React.createClass({

    render() {
        var user = this.props.user || {}
        var profile = user.profile || {}
        if (profile.image) {
            return (<Imgix
                    path={profile.image.path}
                    filename={profile.image.filename}
                    shape="circle"
                    dpr={this.props.dpr}
                    fit="facearea"
                    facepad="2"
                />)
        } else if (!this.props.disablePlaceholder)
            return <i className="material-icons">account_circle</i>
        else
            return <div></div>
    }

})