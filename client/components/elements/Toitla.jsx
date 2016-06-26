import React from 'react';
Toitla = React.createClass({

    render() {
        const size = this.props.size || 1

        const color = this.props.white ? 'white' : 'black'
        const shadow = this.props.shadow ? '-shadow' : ''
        const src = `/icons/${color}-toitla${shadow}.svg`

        return (<div className="margin">
            <img className="toitla center block" src={src} style={{
                width: (10 * size) + 'rem'
            }}/>
        </div>)
    }

})