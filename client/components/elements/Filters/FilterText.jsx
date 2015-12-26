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
        return(<form onSubmit={this.submitForm}><TextInput
                label={this.props.label}
                ref="input"
                _id={this.props.name}
                name={this.props.name}
                onBlur={this.filterChange}
                pattern={this.props.pattern}
                patternError={this.props.patternError}
            /></form>)
    }
})
