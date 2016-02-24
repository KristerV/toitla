Toitla = React.createClass({

    render() {
        const size = this.props.size || 1
        return (<div className="margin">
            <img className="toitla center block" src="/icons/black-toitla.svg" style={{
                width: (10 * size) + 'rem'
            }}/>
        </div>)
    }

})