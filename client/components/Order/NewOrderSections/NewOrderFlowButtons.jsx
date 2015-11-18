NewOrderFlowButtons = React.createClass({
    render() {
        return(<div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col">
                <button
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored w100 mdl-multiline-button" onClick={this.props.secondaryClick}>
                    {this.props.secondaryLabel}
                </button>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
                <button
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent w100 mdl-multiline-button" onClick={this.props.primaryClick}>
                    {this.props.primaryLabel}
                </button>
            </div>
        </div>)
    }
})
