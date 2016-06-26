import React from 'react';
Loader = React.createClass({
    render(){
        var show = !this.props.ifNot
        if (show)
            return(<div id={this.props.id} className={"mdl-spinner mdl-js-spinner is-active absolute-center "+this.props.className}></div>)
        else
            return(<div></div>)
    }
})
