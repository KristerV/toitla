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

                    if (self.props.square || self.props.circle) {
                        const min = Math.min(w, h)
                        params.w = `${min}`
                        params.h = `${min}`
                    }

                    if (self.props.circle)
                        params.mask = 'ellipse'

                    return params;

                }
            });
        });
    },

    render() {
        var width = this.props.width || "100%"
        return<div
            id={this.props.id}
            data-src={this.props.src}
            className="imgix-fluid imgix-fluid-bg"
            style={{width: width,
                backgroundSize: "contain",
                backgroundRepeat: 'no-repeat',
                paddingBottom: "100%",
                backgroundPosition: "center"
                }}
        ></div>
    }

})