MenuItemComponent = React.createClass({

    getInitialState() {
        return {}
    },

    render() {

        // Render
        return(<div>
            {this.props.data ? this.props.data._id : 'noID'}
        </div>)
    }
})
