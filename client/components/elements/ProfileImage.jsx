ProfileImage = React.createClass({

    render() {
        var user = this.props.user || {}
        var profile = user.profile || {}
        if (!profile.image)
            return <i className="material-icons">account_circle</i>
        return (<div>
            <Imgix
                path={profile.image.path}
                filename={profile.image.filename}
                circle={true}
                dpr={this.props.dpr}
                fit="facearea"
                facepad="2"
            />
        </div>)
    }

})