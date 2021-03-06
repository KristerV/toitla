import React from 'react';
MenuitemsTable = React.createClass({

    goToOrder() {
        FlowRouter.go('orderTab', {orderId: FlowRouter.getParam("orderId"), tab: 'menu'})
    },

    render() {
        var menuitems = this.props.menuitems
        var addMenuitemsMode = FlowRouter.current().route.name === 'menus-addItem'
        var isAmount = menuitems.length > 0 ? menuitems[0].amount : false

        return(<div className="margin-top">
            {addMenuitemsMode ?
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent margin" onClick={this.goToOrder}>Return to order</button>
            : null}
            <div className="paper">
                <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp w100">
                    <thead>
                        <tr>
                            <th>In Order</th>
                            <th className="mdl-data-table__cell--non-numeric">Img</th>
                            <th className="mdl-data-table__cell--non-numeric">Chef</th>
                            <th className="mdl-data-table__cell--non-numeric">Title</th>
                            <th className="mdl-data-table__cell--non-numeric">Ing.</th>
                            <th className="mdl-data-table__cell--non-numeric">Tags</th>
                            {isAmount ? <th>Amount</th> : null}
                            <th className="mdl-data-table__cell--non-numeric">Type</th>
                            <th>Price</th>
                            <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuitems.map(function(menuitem, i) {
                            return <MenuitemInTable key={menuitem._id} menuitem={menuitem}/>
                        }.bind(this))}
                    </tbody>
                </table>
                {FlowRouter.current().route.name === 'orderTab' ?
                    <div className="padding">
                        {/* temp info module for copy-pasting. */}
                        {menuitems.map(function(menuitem, i) {
                            return <span key={i}>{menuitem.title} ({menuitem.weight}g) {menuitem.amount}tk<br/></span>
                        }.bind(this))}
                    </div>
                : null}
            </div>
        </div>)
    }
})
