CornerMenu = React.createClass({

    getInitialState() {
        return {}
    },

    handleClick(e) {
        e.stopPropagation()
    },

    handleClickOption(option, e) {
        e.stopPropagation()
        option.onClick(e)
    },

    // Example this.props.options:
    // [{label: 'remove from order', onClick: this.removeFromOrder}]

    render() {
        var rand = Random.id()

        // Render
        return(
        <div className="mdl-container__menu" style={{position: 'relative', padding: '0'}}>
            <button
                style={{position: 'absolute', right: "0"}}
                id={"cornerMenuIcon-"+rand}
                className="mdl-button mdl-js-button mdl-button--icon"
                onClick={this.handleClick}>
                <i className="material-icons">more_vert</i>
            </button>

            <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu"
                htmlFor={"cornerMenuIcon-"+rand}>
                {this.props.options.map(function(option, i){
                    return <li key={i} className="mdl-menu__item" onClick={this.handleClickOption.bind(null,option)}>{option.label}</li>
                }.bind(this))}
            </ul>
        </div>)
    }

})
