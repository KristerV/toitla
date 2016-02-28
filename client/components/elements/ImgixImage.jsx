ImgixImage = React.createClass({


    render() {
        return<div
            data-src={this.props.src}
            className="imgix-fluid imgix-fluid-bg"
            style={{width: "100%", backgroundSize: "contain", backgroundRepeat: 'no-repeat', paddingBottom: "100%"}}
        ></div>
    }

})