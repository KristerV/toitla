import React from 'react';
OrderManagerChef = React.createClass({

    render() {
        var order = this.props.order || {}
        order.errors = order.errors || {}

        if (!_.isEmpty(order.allergies.guests)) {
            var allergies = order.allergies.host + ' - ' + order.allergies.guests.join(" - ")
        }
        return(<div className="margin-top mdl-grid max-width">
            {order.showMenuToChef() ?
                <div className="margin max-width">
                    <MenuitemsContainer orderId={order._id} layout="table" />
                </div>
            :
                <div style={{width: "300px"}}>
                    <h3>You have not yet been included in this order.</h3>
                    <p>Why am I seeing this order? Because other chefs wanted to know whether any orders were coming up - for planning their time.</p>
                </div>
            }
            <div className="paper padding mdl-cell--5-col margin">
                <TextInput
                    label={T.order.form.event.event_type()}
                    disabled={true}
                    value={order.event.eventType}/>
                <TextInput
                    label={T.order.form.event.date()}
                    disabled={true}
                    value={moment(order.event.fromDate).format('DD. MMMM YYYY')}/>
                <TextInput
                    label={T.order.form.event.time()}
                    disabled={true}
                    value={moment(order.event.fromTime).format('HH:mm')}/>
                <p>Allergies</p>
                <p className="text-red">{allergies}</p>
            </div>
            {order.showMenuToChef() ?
                <div className="mdl-cell--5-col margin">
                    {/*only one chefs item is published*/}
                    <ChefConfirm chef={order.chefs[0]} orderId={order._id}/>
                </div>
            : null}
        </div>)
    }
})
