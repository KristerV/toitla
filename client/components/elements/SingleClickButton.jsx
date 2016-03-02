SingleClickButton = React.createClass({

    getInitialState() {
        return {
            active: true
        }
    },

    onClick(e) {
        this.setState({active: false})
        this.props.onClick(e)
    },

    render() {
        if (this.state.active)
            return <Button {...this.props} label={this.props.label} onClick={this.onClick} />
        else
            return <Button {...this.props} label={this.props.labelDisabled} colored={false} accent={false} raised={false}/>
    }

})