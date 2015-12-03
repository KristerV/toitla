OrderManager = React.createClass({

    render() {
        var order = this.props.order || {}
        order.errors = order.errors || {}
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
