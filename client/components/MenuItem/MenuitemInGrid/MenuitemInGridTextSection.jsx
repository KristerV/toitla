MenuitemInGridTextSection = React.createClass({

    getInitialState() {
        return {}
    },

    render() {
        var className = "padding " + this.props.className

        // Render
        return(
        <section className={className}>
            <h5 style={{textAlign: "center", margin: 0}}>{this.props.text}</h5>
        </section>)
    }
})
