
TextInput = React.createClass({

    getInitialState() {
        return {}
    },

    updateTextareaHeight(e) {

    },

    render() {
        var _id = this.props._id || this.props.label

        // Render
        return(
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label js-disablingSwitch">
            {this.getInputType(_id)}
            <label className="mdl-textfield__label" htmlFor={_id}>{this.props.label}</label>
            <span className="mdl-textfield__error">{this.props.errorMsg}</span>
        </div>)
    },

    getInputType(id) {
            if (this.props.rows) {
                return <textarea
                        className="mdl-textfield__input"
                        name={this.props.name}
                        type="text"
                        pattern={this.props.pattern}
                        id={id}
                        key={3}
                        defaultValue={this.props.value}
                        rows={this.props.rows}
                        onBlur={this.props.onBlur}
                        disabled={!this.props.editMode}/>
            } else {
                return <input
                        className="mdl-textfield__input"
                        name={this.props.name}
                        type="text"
                        pattern={this.props.pattern}
                        id={id}
                        key={4}
                        defaultValue={this.props.value}
                        onBlur={this.props.onBlur}
                        disabled={!this.props.editMode}/>
            }
    }
})
