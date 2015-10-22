var {
  Paper,
  DropDownMenu,
  Checkbox,
  RaisedButton,
  Styles,
} = MUI;

StatusForm = React.createClass({

    updatePhase(e, selectedIndex, menuitem) {
        this.props.order.updatePhase(menuitem.value)
    },

    render() {
        var order = this.props.order
        var userId = Meteor.userId()
        return (
            <Paper className="margin padding">
                <DropDownMenu
                    menuItems={this.props.selectPhases}
                    onChange={this.updatePhase}
                    selectedIndex={Settings.getPhaseIndex(order.status.phase)}/>
                <RaisedButton
                    label="Kustuta tellimus"
                    onClick={order.delete.bind(order)}/>
            </Paper>
        );
    }
})
