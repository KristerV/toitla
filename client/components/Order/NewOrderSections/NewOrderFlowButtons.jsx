NewOrderFlowButtons = React.createClass({
    primaryClick(e) {
        var action = this.props.primaryAction
        if (action) {
            this.props.primaryAction(e)
        } else {
            var currentIndex = this.props.flowIndex
            var nextFlowSection = this.props.primaryFlowNext
            this.props.order.nextFlowSection(currentIndex, nextFlowSection)
        }
    },
    secondaryClick(e) {
        var action = this.props.secondaryAction
        if (action) {
            this.props.secondaryAction(e)
        } else {
            var currentIndex = this.props.flowIndex
            var nextFlowSection = this.props.secondaryFlowNext
            this.props.order.nextFlowSection(currentIndex, nextFlowSection)
        }
    },
    render() {
        var secLabel = this.props.secondaryLabel
        var priLabel = this.props.primaryLabel
        if (secLabel)
            var secondary = <div className={"mdl-cell mdl-cell--" + (priLabel ? "6" : "12") + "-col"}>
                            <button
                                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored w100 mdl-multiline-button" onClick={this.secondaryClick}>
                                {secLabel}
                            </button>
                        </div>
        if (priLabel)
            var primary = <div className={"mdl-cell mdl-cell--" + (secLabel ? "6" : "12") + "-col"}>
                            <button
                                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent w100 mdl-multiline-button" onClick={this.primaryClick}>
                                {priLabel}
                            </button>
                        </div>
        return(<div className="mdl-grid">
            {secondary}
            {primary}
        </div>)
    }
})
