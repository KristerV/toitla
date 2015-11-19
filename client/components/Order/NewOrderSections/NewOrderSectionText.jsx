NewOrderSectionText = React.createClass({
    render() {
        var element
        if (this.props.dangerouslySetInnerHTML)
            element = <h4
                className="section-text"
                dangerouslySetInnerHTML={this.props.dangerouslySetInnerHTML}>
            </h4>
        else
            element = <h4 className="section-text">{this.props.text}</h4>
        return(<div className={this.props.className}>
                {element}
            </div>)
    }
})
