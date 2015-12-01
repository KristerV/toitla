NewOrderSection = React.createClass({
    scrollInProgress: false,
    componentDidMount() {
        if (this.scrollInProgress) return
        this.scrollInProgress = true
        Meteor.setTimeout(function(){
            $('body, .mdl-layout__content').animate({
                scrollTop: $(".order-section").last().offset().top - $(".order-section").last().offsetParent().offset().top
            }, 600);
            this.scrollInProgress = false
        }.bind(this), 50);
    },
    render() {

        var left = <div className="mdl-cell mdl-cell--6-col center-down">
            <div className="center-up">
                {this.props.leftContent}
            </div>
        </div>

        var right = <div className="mdl-cell mdl-cell--6-col center-down">
            <div className="center-up">
                {this.props.rightContent}
                {this.props.buttons}
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
