OrderManagerStatus = React.createClass({
    render() {
        return(<div className="max-width margin-top mdl-grid">
            <Checklist
                collectionName="orders"
                docId={this.props.order._id}
                datapath="status"
            />
        </div>)
    }
})
