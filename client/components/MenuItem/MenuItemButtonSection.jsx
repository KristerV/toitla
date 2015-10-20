MenuItemButtonSection = React.createClass({

    getInitialState() {
        return {}
    },

    render() {
        var buttonClass = "w100 mdl-button mdl-js-button mdl-button--raised"
        if (this.props.accented)
            buttonClass += " mdl-button--accent"
        else if (this.props.colored)
            buttonClass += " mdl-button--colored"

        // Render
        return(
        <section className="padding">
            <button className={buttonClass} onClick={this.props.onClick}>{this.props.label}</button>
        </section>)
    }
})