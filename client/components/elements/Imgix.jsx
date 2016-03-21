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
        if (!this.props.filename)
            return null

        // URL
        let path = ''
        if (this.props.path)
            path = G.rmBothSlashes(this.props.path) + '/'
        let filename = this.props.filename

        // Params
        var params = 'crop=faces,entropy&fm=png&auto=enhance'
        params += this.props.dpr ? `&dpr=${this.props.dpr}` : ""
        params += this.props.fit ? `&fit=${this.props.fit}` : `&fit=crop`
        params += this.props.facepad ? `&facepad=${this.props.facepad}` : ""
        if (this.props.shape === 'circle')
            params += `&mask=ellipse&shape=square`
        else if (this.props.shape === 'square')
            params += `&shape=square`

        return `https://toitla.imgix.net/${path}${filename}?${params}`
    },

    render() {
        const url = this.getUrl()

        if (url && this.state.showImage) {
            if (this.props.height)
                return <div style={{height: this.props.height, position: "relative"}}><ImgixImage {...this.props} src={url}/></div>
            else
                return <ImgixImage {...this.props} src={url}/>
        } else if (!this.props.disablePlaceholder)
            return <i style={{fontSize: "4em"}} className="material-icons text-center w100">camera_alt</i>
        else
            return<div></div>
    }

})