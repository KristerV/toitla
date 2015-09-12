var ThemeManager = new MUI.Styles.ThemeManager();
injectTapEventPlugin()

var {
    RaisedButton
} = MUI;

OrderForm = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme(),
        }
    },

    componentWillMount() {
        ThemeManager.setPalette({
            disabledColor: "rgba(0,0,0,0.6)",
        })
    },

    getInitialState() {
        return {}
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("orders", this.props.orderId)
        var order = Orders.findOne(this.props.orderId) || {}

        return {
            order: order,
            subsReady: subscription.ready()
        }
    },

    getDefaultProps() {
        return {
            selectPhases: _.map(Settings.phases, function(obj, key, list){
                return {text: obj.label, value: key, payload: 'status.phase'}
            }),
            selectResults: _.map(Settings.results, function(obj, key, list){
                return {text: obj.label, value: key, payload: 'status.result'}
            }),
        }
    },

    goOverview() {
        FlowRouter.go('/ylevaade')
    },

    render() {

        // Loading
        if (!this.data.subsReady)
            return ( <p>Loading..</p> )

        var order = this.data.order

        if (order.status && Order.allowedEdit(Meteor.userId(), 'status'))
            var statusForm = <StatusForm {...this.props} order={order}/>
        if (order.details)
            var detailsForm = <DetailsForm {...this.props} order={order}/>
        if (order.suborders)
            var suborders = <SubordersForm {...this.props} order={order}/>

        return (
            <div>
                {statusForm}
                {detailsForm}
                {suborders}
            </div>
        )
    }
})
