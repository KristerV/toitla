CornerMenu = React.createClass({

    getInitialState() {
        return {}
    },

    render() {
        var rand = Random.id()

        // Render
        return(
        <div className="mdl-container__menu">
            <button id={"cornerMenuIcon-"+rand} className="mdl-button mdl-js-button mdl-button--icon">
                <i className="material-icons">more_vert</i>
            </button>

            <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu"
                htmlFor={"cornerMenuIcon-"+rand}>
                {this.props.options.map(function(option, i){
                    return <li key={i} className="mdl-menu__item" onClick={option.onClick}>{option.label}</li>
                })}
            </ul>
        </div>)
    }

})
