injectTapEventPlugin()

var {
    Paper,
    TextField,
    RaisedButton,
    Styles,
} = MUI;
var { ThemeManager, LightRawTheme } = Styles;

ClassNAME = React.createClass({
    childContextTypes: { muiTheme: React.PropTypes.object, },
    getChildContext() { return { muiTheme: ThemeManager.getMuiTheme(LightRawTheme), } },

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
