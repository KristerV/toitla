Tag = React.createClass({

    getInitialState() {
        return {}
    },

    render() {
        var active = this.props.active
        var label = this.props.label
        var color = this.props.color

        if (active) {
            var style = {color: color, fontWeight: 'bold'}
        } else {
            var style = {color: "#ccc", fontWeight: 'bold'}
        }

        // Render
        return(
        <button className="mdl-button mdl-js-button" style={style}>
            {label}
        </button>)
    }
})
