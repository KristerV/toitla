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
                self.updateImage()
            }, 10)
            this.urlCache = this.props.filename
        }
    },

    componentDidMount() {
        this.urlCache = this.props.filename
        this.updateImage()
    },

    updateImage() {
        var self = this
        imgix.onready(function() {
            self.fluid = imgix.fluid({
                updateOnResizeDown: false,
                pixelStep: 10,
                debounce: 1.5,
                lazyLoad: true,
                lazyLoadOffsetVertical: 500,
                autoInsertCSSBestPractices: false,
                onChangeParamOverride: function(w, h, params) {

                    if (self.props.circle) {
                        const min = Math.min(w, h)
                        params.w = `${min}`
                        params.h = `${min}`
                        params.mask = 'ellipse'
                    }

                    return params;

                }
            });
        });
    },

    getUrl() {
        let path = G.rmBothSlashes(this.props.path)
        let filename = this.props.filename
        return `https://toitla.imgix.net/${path}/${filename}?fit=crop&crop=faces,entropy`
    },

    render() {
        let path = G.rmBothSlashes(this.props.path)
        let filename = this.props.filename

        if (!path || !filename)
            return <i style={{fontSize: "4em", margin: "2em 0"}} className="material-icons text-center w100">camera_alt</i>

        if (this.state.showImage)
            return (<ImgixImage src={this.getUrl()}/>)
        else
            return<div>refreshing</div>
        // in case want to switch back
        // return (<img src={src} className="imgix-fluid" style={{paddingBottom: "100%"}}/>)
    }

})