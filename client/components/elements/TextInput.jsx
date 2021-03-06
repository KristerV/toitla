
import React from 'react';
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

    handleEnterPress(e) {
        if (e.key === 'Enter' && this.props.onEnter)
            this.props.onEnter(e)
    },

    render() {
        var _id = this.props._id || this.props.id || this.props.label
        var style = this.props.style || {}

        var patternError = this.props.patternError
        if (!patternError && this.props.patternTemplate === 'float')
            patternError = "Please use number"

        // Render
        return(
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label js-disablingSwitch w100" style={style}>
            {this.getInputType(_id)}
            <label className="mdl-textfield__label" htmlFor={_id}>{this.props.label}</label>
            <span className="mdl-textfield__error visible">{this.props.errorMsg}</span>
            <span className="mdl-textfield__error">{patternError}</span>
        </div>)
    },

    getInputType(id) {
        var pattern = this.props.pattern
        if (this.props.patternTemplate === 'float')
            pattern = "-?[0-9]*\\.?[0-9]*"
        if (this.props.errorMsg)
            var errorClass = 'red-underline'
        if (this.props.rows) {
            return <textarea
                    className={"mdl-textfield__input " + errorClass}
                    name={this.props.name}
                    type="text"
                    pattern={pattern}
                    id={id}
                    key={3}
                    ref="textarea"
                    defaultValue={this.props.value}
                    rows={this.props.rows}
                    onBlur={this.props.onBlur}
                    disabled={this.props.disabled}
                    autoFocus={this.props.autofocus}
                    onClick={this.handleClick}
                    style={{maxHeight: "600px"}}
                    />
        } else {
            return <input
                    className={"mdl-textfield__input " + errorClass}
                    name={this.props.name}
                    type="text"
                    pattern={pattern}
                    id={id}
                    key={4}
                    ref="textinput"
                    defaultValue={this.props.value}
                    onBlur={this.props.onBlur}
                    disabled={this.props.disabled}
                    autoFocus={this.props.autofocus}
                    onClick={this.handleClick}
                    onKeyPress={this.handleEnterPress}
                    />
        }
    }
})
