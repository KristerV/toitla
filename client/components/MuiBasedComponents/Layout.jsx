injectTapEventPlugin()

var {
    FlatButton,
    AppBar,
    RaisedButton,
    Styles,
} = MUI;
var { ThemeManager, LightRawTheme } = Styles;

Layout = React.createClass({
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

    goLogin(e) {
        FlowRouter.go("login")
    },

    goNewOrder(e) {
        Order.createOrder()
    },

    goUsers(e) {
        FlowRouter.go("users")
    },

    render() {
        if (Roles.userIsInRole(Meteor.userId(), 'manager'))
            var goUsers = <button className="mdl-button mdl-js-button text-white"
            onClick={this.goUsers}>Kasutajad</button>
        return <div className="h100"><AppBar
            iconElementLeft={Meteor.userId() ?
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
                </div> : <div></div>}
            iconElementRight={Meteor.userId() ? <div>
                {goUsers}
                <button className="mdl-button mdl-js-button text-white"
                    onClick={this.goMenu}>Minu menüü</button>
                <button className="mdl-button mdl-js-button text-white"
                    onClick={this.goProfile}>Profiil</button>
            </div> : <div><button className="mdl-button mdl-js-button text-white"
                onClick={this.goLogin}>Logi sisse / Registreeri</button></div>} />
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
