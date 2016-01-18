
TextInput = React.createClass({

    getInitialState() {
        return {
            textareaHeight: this.props.rows * 12,
        }
    },

    componentDidMount() {
        // auto resize textarea
        if (this.refs.textarea)
            $(this.refs.textarea).textareaAutoSize()
    },

    handleClick(e) {
        e.stopPropagation()
    },

    render() {
        var _id = this.props._id || this.props.label
        var style = this.props.style || {}

        // Render
        return(
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label js-disablingSwitch w100" style={style}>
            {this.getInputType(_id)}
            <label className="mdl-textfield__label" htmlFor={_id}>{this.props.label}</label>
            <span className="mdl-textfield__error visible">{this.props.errorMsg}</span>
            <span className="mdl-textfield__error">{this.props.patternError}</span>
        </div>)
    },

    getInputType(id) {
        if (this.props.errorMsg || this.props.patternError)
            var errorClass = 'red-underline'
        if (this.props.rows) {
            return <textarea
                    className={"mdl-textfield__input " + errorClass}
                    name={this.props.name}
                    type="text"
                    pattern={this.props.pattern}
                    id={id}
                    key={3}
                    ref={this.props.ref || "textarea"}
                    defaultValue={this.props.value}
                    rows={this.props.rows}
                    onBlur={this.props.onBlur}
                    disabled={this.props.disabled}
                    autofocus={this.props.autofocus}
                    onClick={this.handleClick}
                    style={{maxHeight: "600px"}}
                    />
        } else {
            return <input
                    className={"mdl-textfield__input " + errorClass}
                    name={this.props.name}
                    type="text"
                    pattern={this.props.pattern}
                    id={id}
                    key={4}
                    ref={this.props.ref}
                    defaultValue={this.props.value}
                    onBlur={this.props.onBlur}
                    disabled={this.props.disabled}
                    autofocus={this.props.autofocus}
                    onClick={this.handleClick}
                    />
        }
    }
})
