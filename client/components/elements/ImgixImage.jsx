ImgixImage = React.createClass({

    componentDidMount() {
        this.updateImage()
    },

    updateImage() {
        var self = this

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
