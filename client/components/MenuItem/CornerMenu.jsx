CornerMenu = React.createClass({

    getInitialState() {
        return {}
    },

    render() {

        var item = this.props.menuitem || {}
        var menuitemKey = this.props.menuitemKey

        // Render
        return(
        <div className="mdl-container__menu">
            <button id={"cornerMenuIcon-"+menuitemKey} className="mdl-button mdl-js-button mdl-button--icon">
                <i className="material-icons">more_vert</i>
            </button>

            <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu"
                htmlFor={"cornerMenuIcon-"+menuitemKey}>
                {this.getOptionsList()}
            </ul>
        </div>)
    },

    getOptionsList() {
        var optionsList = []
        if (this.props.menuitem && this.props.menuitem.published) {
            optionsList.push(<li key={1} className="mdl-menu__item">eemalda avalikkusest</li>)
        } else {
            optionsList.push(<li key={2} className="mdl-menu__item">muuda</li>)
            optionsList.push(<li key={3} className="mdl-menu__item">kustuta</li>)
            optionsList.push(<li key={4} className="mdl-menu__item">eemalda tellimusest</li>)
        }
        return optionsList
    },

})
