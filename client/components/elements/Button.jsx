import React from 'react';
Button = React.createClass({

    render() {
        var style = this.props.style || {}
        var className = "mdl-button mdl-js-button " + this.props.className
        if (this.props.className)
            className += " " + this.props.className
        if (this.props.raised)
            className += " mdl-button--raised"
        if (this.props.colored)
            className += " mdl-button--colored"
        if (this.props.accent)
            className += " mdl-button--accent"
        if (this.props.large) {
            style.fontSize = "1.3em"
            style.padding = "0.3em 1.4em"
            style.height = "auto"
        }

        return (<button className={className} onClick={this.props.onClick} style={style}>{this.props.label}</button>)
    }

})