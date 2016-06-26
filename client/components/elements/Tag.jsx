import React from 'react';
Tag = React.createClass({

    getInitialState() {
        return {}
    },

    render() {
        var active = this.props.active
        var label = this.props.label
        var color = this.props.color
        var name = this.props.name
        var disabled = this.props.disabled
        var onClick = disabled ? null : this.props.onClick

        if (active) {
            var style = {color: color, fontWeight: 'bold'}
        } else {
            var style = {color: "#ccc", fontWeight: 'bold'}
        }

        // Render
        return(
        <button className="mdl-button mdl-js-button" style={style} onClick={onClick} name={name}>
            {label}
        </button>)
    }
})
