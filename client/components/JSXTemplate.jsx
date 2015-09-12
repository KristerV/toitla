var ThemeManager = new MUI.Styles.ThemeManager();
injectTapEventPlugin()

var {
    Paper,
    TextField,
    RaisedButton,
} = MUI;

ClassNAME = React.createClass({
    childContextTypes: { muiTheme: React.PropTypes.object, },
    getChildContext() { return { muiTheme: ThemeManager.getCurrentTheme(), } },

    getInitialState() {
        return {}
    },

    getDefaultProps() {
        return {}
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("orders")
        return {
            subsReady: subscription.ready()
        }
    },

    render() {
        return(<div>empty</div>)
    }
})
