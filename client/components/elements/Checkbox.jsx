Checkbox = React.createClass({
    render() {
        var labelClass = "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect "
        var inputClass = "mdl-checkbox__input"
        if (this.props.defaultStyle) {
            labelClass = ""
            inputClass = ""
        }
        return(<label
                className={labelClass + this.props.className}
                id={this.props.id}>
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
