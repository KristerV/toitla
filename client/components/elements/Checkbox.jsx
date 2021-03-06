import React from 'react';
Checkbox = React.createClass({
    render() {
        var labelClass = "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect "
        var inputClass = "mdl-checkbox__input"

        // Use this when need controlled checked state. MDL does not support.
        if (this.props.defaultStyle) {
            labelClass = ""
            inputClass = ""
        }
        return(<label
                className={labelClass + this.props.className}
                id={this.props.id}
                style={this.props.style}>
            <input
                type="checkbox"
                className={inputClass}
                defaultChecked={this.props.defaultChecked}
                checked={this.props.checked}
                onChange={this.props.onChange}
                name={this.props.name}
            />
            <span className="mdl-checkbox__label">{this.props.label}</span>
        </label>)
    }
})
