OrderSection = React.createClass({

    render() {
        if (this.props.content) { // single column
            return(<section className="mdl-grid order-section">
                    <div className="mdl-cell mdl-cell--12 center-down">
                        <div className="center-up">
                            {this.props.content}
                        </div>
                    </div>
                </section>)
        } else { // double column
            return(<section className="mdl-grid order-section">
                    <div className="mdl-cell mdl-cell--6-col center-down">
                        <div className="center-up">
                            {this.props.leftContent}
                        </div>
                    </div>
                    <div className="mdl-cell mdl-cell--6-col center-down">
                        <div className="center-up">
                            {this.props.rightContent}
                        </div>
                    </div>
                </section>)
        }
    }
})
