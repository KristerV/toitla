import React from 'react';
OrderManagerInfo = React.createClass({

    render() {
        var order = this.props.order || {};
        order.errors = order.errors || {};
        return(<div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
                <OrderContactForm order={order}/>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
                <OrderEventForm order={order}/>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
                <OrderAllergiesForm order={order}/>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
                <OrderPaymentForm order={order}/>
            </div>
            <div className="mdl-cell mdl-cell--8-col">
                <OrderGeneralInputForm
                    order={order}
                    inputRows={1}
                    inputName="extraInfo"
                    inputValue={order.extraInfo}
                    inputErrorMsg={order.errors['extraInfo']}
                />
            </div>
        </div>)
    }
});
