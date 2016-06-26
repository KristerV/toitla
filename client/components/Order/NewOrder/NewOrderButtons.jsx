import React from 'react';
NewOrderButtons = React.createClass({
    render() {
        return(<div className="mdl-grid">
            <div className={"mdl-cell mdl-cell--12-col"}>
                <button
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent w100 mdl-multiline-button" onClick={this.props.onClick}>
                    {this.props.label}
                </button>
            </div>
        </div>)
    }
})
