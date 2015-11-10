
StatusForm = React.createClass({

    getDefaultProps() {
        return {
            selectPhases: _.map(Settings.phases, function(obj, key, list){
                return {text: obj.label, value: key, payload: 'status.phase'}
            }),
        }
    },

    updatePhase(e, selectedIndex, menuitem) {
        this.props.order.updatePhase(menuitem.value)
    },

    deleteOrder(e) {
        var order = this.props.order
        order.delete()
    },

    getPhaseIndex() {
        if (this.props.order && this.props.order.status)
            return Settings.getPhaseIndex(this.props.order.status.phase)
        else
            return 0
    },

    render() {
        var order = this.props.order
        return (
            <div className="margin padding paper">
            <DropDown
                menuItems={this.props.selectPhases}
                onChange={this.updatePhase}
                selectedIndex={this.getPhaseIndex()}
                autoWidth={true}/>
            <button className="mdl-button mdl-js-button mdl-button--raised" onClick={this.deleteOrder}>Kustuta tellimus</button>
            <Loader ifNot={order}/>
            </div>
        );
    }
})
