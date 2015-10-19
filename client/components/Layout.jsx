var ThemeManager = new MUI.Styles.ThemeManager();
injectTapEventPlugin()

var {
    FlatButton,
    AppBar,
    RaisedButton
} = MUI;

Layout = React.createClass({
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

    goHome(e) {
        FlowRouter.go("/home")
    },

    goOverview(e) {
        FlowRouter.go("/ylevaade")
    },

    goProfile(e) {
        FlowRouter.go("profile", {userId: Meteor.userId()})
    },

    goMenu(e) {
        FlowRouter.go("menu", {userId: Meteor.userId()})
    },

    goNewOrder(e) {
        Order.createOrder()
    },

    render() {
        return <div className="h100"><AppBar
            iconElementLeft={
                <div>
                    <RaisedButton
                        label="Toitla"
                        secondary={true}
                        onClick={this.goHome}/>
                    <RaisedButton
                        label="Ülevaade"
                        secondary={true}
                        onClick={this.goOverview}/>
                    <RaisedButton
                        label="Uus tellimus"
                        primary={true}
                        onClick={this.goNewOrder}/>
                </div>}
            iconElementRight={<div>
                <button className="mdl-button mdl-js-button text-white"
                    onClick={this.goMenu}>Minu menüü</button>
                <button className="mdl-button mdl-js-button text-white"
                    onClick={this.goProfile}>Profiil</button>
            </div> } />
        {this.props.content}</div>
        // return(<Toolbar>
        //     <ToolbarGroup float="left">
        //         <FlatButton label="Toitla" />
        //         <FlatButton label="Ülevaade" />
        //     </ToolbarGroup>
        //     <ToolbarGroup float="right">
        //         <FlatButton label="Profiil" />
        //     </ToolbarGroup>
        //     {this.props.content}
        // </Toolbar>)
    }
})
