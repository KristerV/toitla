Markdown = React.createClass({
    propTypes: {
        children: React.PropTypes.string,
        element: React.PropTypes.string,
        className: React.PropTypes.string,
    },

    getDefaultProps() {
        return {
            element: 'div'
        };
    },

    render() {
        if (!this.props.children)
            return <div className="markdown-content-empty"></div>

        let className = this.props.className || this.constructor.displayName
        className += " markdown"

        return (
            <this.props.element
                className={className}
                dangerouslySetInnerHTML={ { __html: marked(this.props.children) } }
            />
        );
    }
});