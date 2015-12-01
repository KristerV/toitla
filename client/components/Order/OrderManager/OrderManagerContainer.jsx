OrderManagerContainer = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("orders", this.props.orderId)
        var order = Orders.findOne(this.props.orderId)

        return {
            order: order,
            subsReady: subscription.ready()
        }
    },

    render() {
        if (!this.data.subsReady)
            return <Loader/>
        var order = this.data.order
        return(<div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--4-col">
                        <StatusForm order={order}/>
                        <OrderContactForm order={order}/>
                    </div>
                    <div className="mdl-cell mdl-cell--4-col">
                        <OrderEventForm order={order}/>
                    </div>
                    <div className="mdl-cell mdl-cell--4-col">
                        <OrderAllergiesForm order={order}/>
                        <OrderGeneralInputForm
                            order={order}
                            inputRows={1}
                            inputName="extraInfo"
                            inputLabel={T("order", "extra_form_label")}
                            inputValue={order.extraInfo}
                            inputErrorMsg={order.errors['extraInfo']}
                        />
                    </div>
                    <div className="mdl-cell mdl-cell--4-col">
                        <OrderMenuForm order={order}/>
                    </div>
                    <div className="mdl-cell mdl-cell--12-col">
                        <MenuItemsContainer order={order}/>
                    </div>
                </div>)
    }
})
