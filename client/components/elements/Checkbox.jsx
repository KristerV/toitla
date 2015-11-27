Checkbox = React.createClass({
    render() {
        return(<label className={"mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect " + this.props.className}>
            <input
                type="checkbox"
                className="mdl-checkbox__input"
                defaultChecked={this.props.checked}
                onChange={this.props.onChange}
                name={this.props.name}/>
            <span className="mdl-checkbox__label">{this.props.label}</span>
        </label>)
    }
})
