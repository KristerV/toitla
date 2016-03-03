Imgix = React.createClass({

    getInitialState() {
        return {
            showImage: true
        }
    },

    componentDidUpdate() {

        // This hack is necessary to update image data-src. Imgix seems lacking this functionality properly
        // cache stops the timeout from running forever
        if (this.urlCache !== this.props.filename) {
            var self = this
            this.setState({showImage: false})
            Meteor.setTimeout(() => {
                self.setState({showImage: true})
            }, 10)
            this.urlCache = this.props.filename
        }
    },

    componentDidMount() {
        this.urlCache = this.props.filename
    },

    getUrl() {
        let path = G.rmBothSlashes(this.props.path)
        let filename = this.props.filename
        let dpr = this.props.dpr ? `&dpr=${this.props.dpr}` : ""
        let fit = this.props.fit ? `&fit=${this.props.fit}` : `&fit=crop`
        let facepad = this.props.facepad ? `&facepad=${this.props.facepad}` : ""
        return `https://toitla.imgix.net/${path}/${filename}?${fit}${facepad}&crop=faces,entropy&fm=png${dpr}`
    },

    render() {
        let path = G.rmBothSlashes(this.props.path)
        let filename = this.props.filename

        if (!path || !filename)
            return <i style={{fontSize: "4em", margin: "2em 0"}} className="material-icons text-center w100">camera_alt</i>

        if (this.state.showImage)
            return (<ImgixImage src={this.getUrl()} circle={this.props.circle}/>)
        else
            return<div>refreshing</div>
        // in case want to switch back
        // return (<img src={src} className="imgix-fluid" style={{paddingBottom: "100%"}}/>)
    }

})