NewOrder = React.createClass({

    render() {
        if (!this.props.order)
            return(<Loader/>)
        var order = this.props.order
        order.errors = order.errors || {}
        return(<div className="h100">

            {/*Status*/}
            {/*<StatusForm order={order}/>*/}

            {/*Contacts*/}
            <NewOrderSectionContacts order={order} flowIndex={0} primaryFlowNext="event_form" secondaryFlowNext="contact_form_finish"/>
            <NewOrderSectionContactsFinish order={order} flowIndex={1} primaryFlowNext="thanks_form"/>

            {/*Event details*/}
            <NewOrderSectionEvent order={order} flowIndex={1} primaryFlowNext="allergies_form" secondaryFlowNext="event_form_finish"/>
            <NewOrderSectionEventFinish order={order} flowIndex={2} primaryFlowNext="thanks_form"/>

            {/*Menu*/}
            <NewOrderSectionMenu order={order} flowIndex={2} primaryFlowNext="allergies_form" secondaryFlowNext="menu_form_finish"/>
            <NewOrderSectionMenuFinish order={order} flowIndex={3} primaryFlowNext="thanks_form"/>

            {/*Allergies*/}
            <NewOrderSectionAllergies order={order} flowIndex={3} primaryFlowNext="extra_form"/>

            {/*Extra info*/}
            <NewOrderSectionExtra order={order} flowIndex={4} primaryFlowNext="thanks_form"/>

            {/*Thanks*/}
            <NewOrderSectionThanks order={order} flowIndex={5} primaryFlowNext=""/>

        </div>)
    }
})
