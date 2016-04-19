ImgixImage = React.createClass({

    componentDidMount() {
        this.updateImage()
    },

    updateImage() {
        var self = this

    },

    render() {
        var width = this.props.width || "100%"
        var padBott = this.props.height ? this.props.height+"px" : "100%"
        var style = {width: width,
            backgroundSize: "contain",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: "center"
        }
        _.extend(style, this.props.style, {paddingBottom: padBott}) // overwrite defaults with props (padBott is important)
        return<div
            id={this.props.id}
            data-src={this.props.src}
            className={"imgix-fluid imgix-fluid-bg " + this.props.className}
            style={style}
        ></div>
    }

})
