TextInput = React.createClass({

    getInitialState() {
        return {}
    },

    render() {
        var _id = this.props._id || this.props.label

        // Render
        return(
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            {this.getInput()}

            <label className="mdl-textfield__label" htmlFor={_id}>{this.props.label}</label>
            <span className="mdl-textfield__error">{this.props.errorMsg}</span>
        </div>)
    },

    getInput() {
        var _id = this.props._id || this.props.label
        var pattern = this.props.pattern
        var rows = this.props.rows

        if (rows) {
            return <textarea
                    className="mdl-textfield__input"
                    type="text"
                    pattern={pattern}
                    id={_id}
                    defaultValue={this.props.value}
                    rows={rows}/>
        } else {
            return <input
                    className="mdl-textfield__input"
                    type="text"
                    pattern={pattern}
                    id={_id}
                    defaultValue={this.props.value}/>
        }
    }
})
