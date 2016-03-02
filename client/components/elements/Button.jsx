Button = React.createClass({

    render() {
        var className = "mdl-button mdl-js-button " + this.props.className
        if (this.props.className)
            className += " " + this.props.className
        if (this.props.raised)
            className += " mdl-button--raised"
        if (this.props.colored)
            className += " mdl-button--colored"
        if (this.props.accent)
            className += " mdl-button--accent"

        return (<button className={className} onClick={this.props.onClick}>{this.props.label}</button>)
    }

})