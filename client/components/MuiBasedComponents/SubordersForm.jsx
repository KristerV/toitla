
var {
    Paper,
    TextField,
    RaisedButton,
    Styles,
} = MUI;

SubordersForm = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("suborders")
        var suborders = Suborders.find({orderId: this.props.order._id}).fetch() || {}

        return {
            suborders: suborders,
            subsReady: subscription.ready()
        }
    },

    render() {
        if (!this.data.subsReady)
            return <p>Loading Suborders...</p>

        var order = this.props.order
        if (Order.allowedEdit(Meteor.userId(), 'suborders')) {
            var newButton = <RaisedButton
                primary={true}
                label="New suborder"
                onClick={order.createSuborder.bind(order)}/>
        }

        return(<div>
            {this.data.suborders.map(function(suborder){
                return <SuborderItem key={suborder._id} suborderId={suborder._id}/>
            }.bind(this))}
            <div className="margin">
                {newButton}
            </div>
        </div>)
    }
})
