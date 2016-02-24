Markdown = React.createClass({
    propTypes: {
        children: React.PropTypes.string.isRequired,
        element: React.PropTypes.string,
        className: React.PropTypes.string,
    },

    getDefaultProps() {
        return {
            element: 'div'
        };
    },

    render() {
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