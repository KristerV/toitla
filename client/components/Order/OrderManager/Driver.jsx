Driver = React.createClass({

    render() {
        var order = this.props.order || {}
        order.driver = order.driver || {}
        return(<div className="padding center"
                    style={{
                        backgroundColor: 'white',
                        maxWidth: '700px',
                        paddingBottom: '4em'
                       }}>
                <Toitla/>
                <Markdown>{marked(order.driver.info)}</Markdown>
        </div>)
    }
})
