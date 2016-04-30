import React from 'react'
import ImgixOfficial from 'react-imgix'

Imgix = React.createClass({

	getInitialState() {
		return {
			width: this.props.width || null,
			height: this.props.height || null
		}
	},

	getUrl() {
		if (!this.props.filename)
			return null

		// URL
		let path = ''
		if (this.props.path)
			path = G.rmBothSlashes(this.props.path) + '/'
		let filename = this.props.filename
		return `https://toitla.imgix.net/${path}${filename}`
	},

	componentDidMount() {this.updateSize()},
	componentDidUpdate() {},

	updateSize() {
		let node = ReactDOM.findDOMNode(this)
		console.log("node.scrollHeight", node.scrollHeight, node.parentNode.scrollHeight)
		this.setState({
			width: node.scrollWidth,
			height: node.scrollHeight || node.parentNode.scrollHeight,
		})
	},

	render() {
		console.log("this.state", this.state)
		let url = this.getUrl()

		let customParams = {
			fm: this.props.format || 'jpg',
		}
		if (this.props.dpr) customParams.dpr = this.props.dpr
		if (this.props.facepad) customParams.facepad = this.props.facepad
		if (this.props.pad) customParams.pad = this.props.pad

		let width = this.state.width
		let height = this.state.height
		if (this.props.shape === 'circle') {
			customParams.mask = 'ellipse'
			let min = Math.min(width, height)
			width = min
			height = min
		}

		if (url && height && width)
			return <ImgixOfficial
				src={url} // required, usually in the form: 'https://[your_domain].imgix.net/[image]'. Don't include any parameters.

				aggressiveLoad={true} // whether to wait until the component has mounted to render the image, useful for auto-sizing, defaults to false
				auto={['enhance']} // array of values to pass to Imgix's auto param, defaults to ['format']
				bg={this.props.bg || false} // whether to render the image as a background of the component, defaults to false
				className={this.props.className}
				entropy={true} // whether or not to crop using points of interest. See Imgix API for more details. Defaults to false
				fit={this.props.fit || 'crop'} // see Imgix's API, defaults to 'crop'
				height={height} // force images to be a certain height, overrides precision
				width={width} // force images to be a certain width, overrides precision
				customParams={customParams} // any other Imgix params to add to the image src
			/>
		else
			return <div></div>
	}

})