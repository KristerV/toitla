MenuitemButtonAdd = React.createClass({

    newMenuitemTemplate() {
        Meteor.call('menuitemTemplate--new', this.props.chefId)
    },

    newMenuitemInOrder() {
        // redirect to menues with onClick function
        var orderId = this.props.orderId
        FlowRouter.go("menus-addItem", {orderId: orderId})
    },

    render() {

        var route = FlowRouter.current().route.name
        var buttonLabel
        var buttonAction

        if (Meteor.userId()) {
            if (route === "menu") {
                buttonLabel = "Create new food"
                buttonAction = this.newMenuitemTemplate
            } else if (route === "order") {
                buttonLabel = "Add food"
                buttonAction = this.newMenuitemInOrder
            }
        }

        if (buttonLabel && buttonAction) {
            return <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
                onClick={buttonAction}>
                    {buttonLabel}
            </button>
        }

        return(<div></div>)
    }
})
