var ThemeManager = new MUI.Styles.ThemeManager();
injectTapEventPlugin()

var {
    Paper,
    TextField,
    RaisedButton,
    List,
    ListItem,
    ListDivider
} = MUI;

ListPhase = React.createClass({
    childContextTypes: { muiTheme: React.PropTypes.object, },
    getChildContext() { return { muiTheme: ThemeManager.getCurrentTheme(), } },

    getInitialState() {
        return {
        }
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = {ready: function(){return false}} // needed for error prevention

        if (Roles.userIsInRole(Meteor.userId(), 'manager')) {
            subscription = Meteor.subscribe("orders")
            var orders = Orders.find({"status.phase": this.props.phase}).fetch()
        } else if (Roles.userIsInRole(Meteor.userId(), 'chef')) {
            subscription = Meteor.subscribe("suborders")
            var suborders = Suborders.find({"phase": this.props.phase}).fetch()
        }

        return {
            orders: orders,
            suborders: suborders,
            subsReady: subscription.ready()
        }
    },

    handleItemClick(itemId, isOrder) {
        if (isOrder)
            FlowRouter.go("/tellimus/"+itemId)
        else
            FlowRouter.go("/alatellimus/"+itemId)
    },

    render() {
        if (!this.data.subsReady)
            return <p>Loading phase..</p>
        var phase = this.props.phase
        var label = Settings.phases[phase].label
        var subheaderStyle = {
            backgroundColor: "rgb(231, 231, 231)",
        }
        var array = Roles.userIsInRole(Meteor.userId(), 'chef') ? this.data.suborders : this.data.orders
        return(
            <Paper className="overview-list margin">
                <List subheader={label} subheaderStyle={subheaderStyle}>
                    {array.map(function(item){
                        if (item.details) { // is order
                            var title = item.contact.organization
                            var subtitle1 = item.details.customPrice
                            var subtitle2 = ''
                        } else { // is suborder
                            var title = item.orderDescription
                            var subtitle1 = item.price || item.details.calculatedPrice
                            var subtitle2 = item.dueDate
                        }

                        subtitle1 += "€"
                        return <ListItem
                            className="border-b-1"
                            key={item._id}
                            onClick={this.handleItemClick.bind(this, item._id, !!item.details)}
                            className="crop-text"
                            primaryText={title}
                            secondaryText={<p>{subtitle1} {subtitle2}</p>}
                        />
                    }.bind(this))}
                </List>
            </Paper>
        )
    }
})
