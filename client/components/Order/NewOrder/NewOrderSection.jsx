NewOrderSection = React.createClass({
    render() {

        var left = <div className="mdl-cell mdl-cell--6-col center-down">
            <div className="center-up">
                {this.props.leftContent}
                {this.props.leftButtons}
            </div>
        </div>

        var right = <div className="mdl-cell mdl-cell--6-col center-down">
            <div className="center-up">
                {this.props.rightContent}
                {this.props.rightButtons}
            </div>
        </div>

        var bottom = <div className="mdl-cell mdl-cell--12-col center-down">
            <div className="center-up">
                {this.props.bottomContent}
                {this.props.bottomButtons}
            </div>
        </div>

        // Remove empty element so margin: auto works on section contents
        if (this.props.leftContent && this.props.rightContent && !this.props.bottomContent) {
            bottom = null
        } else if (!this.props.leftContent && !this.props.rightContent && this.props.bottomContent) {
            left = null
            right = null
        }

        return(<section className="mdl-grid order-section max-width box">
                {left}
                {right}
                {bottom}
            </section>)
    }
})
