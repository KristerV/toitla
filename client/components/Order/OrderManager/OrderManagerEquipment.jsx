import React from 'react';
OrderManagerEquipment = React.createClass({

    render() {
        var order = this.props.order || {}
        return(<div className="max-width mdl-grid margin-top margin-bottom">
            <div className="paper padding mdl-cell mdl-cell--6-col">
                <Checklist
                    collectionName="orders"
                    docId={order._id}
                    datapath="equipment"
                />
            </div>
        </div>)
    }
})
