ImgixImage = React.createClass({

    componentDidMount() {
        this.updateImage()
    },

    updateImage() {
        var self = this
        imgix.onready(function() {
            self.fluid = imgix.fluid({
                updateOnResizeDown: false,
                pixelStep: 10,
                debounce: 1.5,
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

    render() {
        return<div
            data-src={this.props.src}
            className="imgix-fluid imgix-fluid-bg"
            style={{width: "100%", backgroundSize: "contain", backgroundRepeat: 'no-repeat', paddingBottom: "100%"}}
        ></div>
    }

})