import React from 'react';
OrderGeneralInfoForm = React.createClass({

    render() {
        return(<div className="paper margin padding">
            <h2>{this.props.title}</h2>
            <p>{this.props.description}</p>
        </div>)
    }
})
