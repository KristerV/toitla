RouteDenied = React.createClass({

    goHome(e) {
        FlowRouter.go("/")
    },

    render() {
        return(<div className="max-width">
                <h3 className="text-center text-white">Hey, you're not allowed here!</h3>
                <button className="center display-inherit mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
                    onClick={this.goHome}>go home</button>
            </div>)
    }
})
