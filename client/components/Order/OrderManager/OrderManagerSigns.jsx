import React from 'react';
OrderManagerSigns = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("menuitems_inorder", this.props.orderId);
        var menuItems = MenuitemsInOrder.find({orderId: this.props.order._id});

        return {
            menuItems: menuItems.fetch(),
            subsReady: subscription.ready()
        }
    },

    render() {
        if (!this.data.subsReady) {
            return <Loader/>;
        }

        var pages = [];

        this.data.menuItems.forEach(item => {
            pages.push(<div key={item._id + 'wrapper'} className="sign-page"><Sign key={item._id} menuitem={item} backFace={true}/></div>);
        });

        return(<div className="sign-layout max-width margin-top margin-bottom">
            <h3 className="text-center text-white">Printing center</h3>
            <div className="center paper padding" style={{width: "200px"}}>
                <button className="w100 mdl-button mdl-button--raised mdl-button--accent" onClick={G.print}>Print menu</button>
            </div>
            <div id="printable-container" style={{padding: "40px 80px"}}>
                <div id="printable-content">
                    {pages}
                </div>
            </div>
        </div>)
    }
});
