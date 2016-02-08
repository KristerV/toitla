ChefConfirmations = React.createClass({

    render() {
        var order = this.props.order
        order.chefs = order.chefs || []

        if (!order.isPhaseAchieved('chefConfirm')) {
            return <p className="padding margin text-white text-hint">Chef confirming can start with "Chefs confirm" status.</p>
        }

        return(<div className="mdl-grid">
                {_.map(order.chefsInOrder, chefId => {
                    var chef = {_id: chefId}
                    order.chefs.forEach(item => {
                        if (item._id === chefId)
                            chef = item
                    })
                    return <div className="mdl-cell mdl-cell--4-cell" key={chefId}>
                        <ChefConfirm chef={chef} orderId={order._id}/>
                    </div>
                })}
            </div>)
    }

})
