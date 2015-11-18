NewOrderSection = React.createClass({
    render() {
        return(<section className="mdl-grid order-section">
                <div className="mdl-cell mdl-cell--6-col center-down">
                    <div className="center-up">
                        {this.props.leftContent}
                    </div>
                </div>
                <div className="mdl-cell mdl-cell--6-col center-down">
                    <div className="center-up">
                        {this.props.rightContent}
                        {this.props.buttons}
                    </div>
                </div>
                <div className="mdl-cell mdl-cell--12-col center-down">
                    <div className="center-up">
                        {this.props.bottomContent}
                        {this.props.bottomButtons}
                    </div>
                </div>
            </section>)
    }
})
