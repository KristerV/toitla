NewOrder = React.createClass({

    submitForm(e) {
        this.props.order.submitForm()
    },

    goHome() {
        FlowRouter.go("/")
    },

    render() {
        if (!this.props.order)
            return(<Loader/>)
        var order = this.props.order
        order.errors = order.errors || {}
        order.flow = order.flow || []

        var forms = []
        for (var i = 0; i < order.flow.length; i++) {
            var form
            switch (order.flow[i]) {
                case "NewOrderSectionContacts":
                    form = <NewOrderSectionContacts key={i} order={order} flowIndex={0} primaryFlowNext="NewOrderSectionEvent" secondaryFlowNext="NewOrderSectionContactsFinish"/>
                    break
                case "NewOrderSectionContactsFinish":
                    form = <NewOrderSectionContactsFinish key={i} order={order} flowIndex={1}
                    primaryAction={this.submitForm}
                    primaryFlowNext="NewOrderSectionThanks"/>
                    break
                case "NewOrderSectionEvent":
                    form = <NewOrderSectionEvent key={i} order={order} flowIndex={1} primaryFlowNext="NewOrderSectionAllergies" secondaryFlowNext="NewOrderSectionEventFinish"/>
                    break
                case "NewOrderSectionEventFinish":
                    form = <NewOrderSectionEventFinish key={i} order={order} flowIndex={2}
                    primaryAction={this.submitForm}
                    primaryFlowNext="NewOrderSectionThanks"/>
                    break
                case "NewOrderSectionMenu":
                    form = <NewOrderSectionMenu key={i} order={order} flowIndex={2} primaryFlowNext="NewOrderSectionAllergies" secondaryFlowNext="NewOrderSectionMenuFinish"/>
                    break
                case "NewOrderSectionMenuFinish":
                    form = <NewOrderSectionMenuFinish key={i} order={order} flowIndex={3}
                    primaryAction={this.submitForm}
                    primaryFlowNext="NewOrderSectionThanks"/>
                    break
                case "NewOrderSectionAllergies":
                    form = <NewOrderSectionAllergies key={i} order={order} flowIndex={3} primaryFlowNext="NewOrderSectionExtra"/>
                    break
                case "NewOrderSectionExtra":
                    form = <NewOrderSectionExtra key={i} order={order} flowIndex={4}
                    primaryAction={this.submitForm}
                    primaryFlowNext="NewOrderSectionThanks"/>
                    break
                case "NewOrderSectionThanks":
                    form = <NewOrderSectionThanks key={i} order={order} flowIndex={5} primaryAction={this.goHome}/>
                    break
                default:
                    throw new Meteor.Error("NewOrder form does not exist: " + order.flow[i])
            }
            forms.push(form)
        }

        return(<div className="h100">
            {/*<StatusForm order={order}/>*/}
            {forms}
        </div>)
    }
})
