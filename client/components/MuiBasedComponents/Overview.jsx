injectTapEventPlugin()

var {
    Paper,
    TextField,
    RaisedButton,
    Styles
} = MUI;
var { ThemeManager, LightRawTheme } = Styles;

Overview = React.createClass({
    childContextTypes: { muiTheme: React.PropTypes.object, },
    getChildContext() { return { muiTheme: ThemeManager.getMuiTheme(LightRawTheme), } },

    getInitialState() {
        var phases = _.keys(Settings.phases)
        if (Roles.userIsInRole(Meteor.userId(), 'chef')) {
            phases.shift() // remove 'unsubmitted' phase
            phases.shift() // remove 'new' phase
        }
        return {
            phases: phases
        }
    },

    render() {
        return (<h4 style={{color: "white"}}>Tellimusi vastu võtta keskkond veel ei võimalda. Seniks võid oma menüü ja profiili ära täita!</h4>)
        var phases = this.state.phases
        var ListPhases = []
        for (var i = 0; i < phases.length; i++) {
            ListPhases.push(<ListPhase key={phases[i]} phase={phases[i]}/>)
        }
        return(<div>{ListPhases}</div>)
    }
})
