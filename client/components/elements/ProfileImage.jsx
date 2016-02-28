ProfileImage = React.createClass({

    render() {
        var user = this.props.user || {}
        var profile = user.profile || {}
        let image = profile.image || {}
        return (<div style={{}/*{borderRadius: "100%", overflow: "hidden"}*/}>
            <Imgix path={image.path} filename={image.filename} circle={true}/>
        </div>)
    }

})