import React from 'react';
FilterText = React.createClass({
    filterChange(e) {
        this.update(e.target.value)
    },
    submitForm(e) {
        e.preventDefault()
        var value = $('#'+this.props.name).val()
        this.update(value)
    },
    update(value) {
        this.props.onChange({name: this.props.name, value: value})
    },
    render() {
        return(<form onSubmit={this.submitForm}>
            <TextInput
                label={this.props.label}
                _id={this.props.name}
                name={this.props.name}
                onBlur={this.filterChange}
                patternTemplate={this.props.patternTemplate}
                pattern={this.props.pattern}
                patternError={this.props.patternError}
            /></form>)
    }
})
