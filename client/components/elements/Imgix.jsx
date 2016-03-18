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
        if (!this.props.path || !this.props.filename)
            return null
        let path = G.rmBothSlashes(this.props.path)
        let filename = this.props.filename
        let dpr = this.props.dpr ? `&dpr=${this.props.dpr}` : ""
        let fit = this.props.fit ? `&fit=${this.props.fit}` : `&fit=crop`
        let facepad = this.props.facepad ? `&facepad=${this.props.facepad}` : ""
        return `https://toitla.imgix.net/${path}/${filename}?${fit}${facepad}&crop=faces,entropy&fm=png${dpr}`
    },

    render() {
        const url = this.getUrl()

        if (url && this.state.showImage)
            return <ImgixImage {...this.props} src={url}/>
        else if (!this.props.disablePlaceholder)
            return <i style={{fontSize: "4em"}} className="material-icons text-center w100">camera_alt</i>
        else
            return<div></div>

        // in case want to switch back
        // return (<img src={src} className="imgix-fluid" style={{paddingBottom: "100%"}}/>)
    }

})