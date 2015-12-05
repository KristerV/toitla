MenuitemInTable = React.createClass({

    tickChecbox(mouseEvent, reactId, event) {
        mouseEvent.stopPropagation()
        var menuitemId = $(mouseEvent.target).parent().attr("data-menuitem-id")
        if (!menuitemId) return false
        var checkboxMDL = $('.mdl-js-checkbox#'+menuitemId)[0].MaterialCheckbox
        var checkboxInput = $('.mdl-js-checkbox#'+menuitemId+' input')

        if (checkboxInput.is(":checked")) {
            checkboxMDL.uncheck()
        } else {
            checkboxMDL.check()
        }
    },

    render() {
        var menuitem = this.props.menuitem
        return(<tr className="paper padding" onClick={this.tickChecbox} data-menuitem-id={menuitem._id}>
            {this.props.checkboxes ? <td><Checkbox name="Tere" id={menuitem._id} /></td> : null}
            <td>{menuitem.chefName}</td>
            <td className="wrap">{menuitem.title}</td>
            <td>
                <div id={"ingredients-tooltip-"+menuitem._id} className="icon material-icons">receipt</div>
                <div
                    className="mdl-tooltip"
                    htmlFor={"ingredients-tooltip-"+menuitem._id}
                    style={{whiteSpace: "normal"}}>
                    {menuitem.ingredients}
                </div>
            </td>
            <td className="wrap"><Tags activeTags={menuitem.tags} onlyActive={true}/></td>
            <td>{menuitem.foodType}</td>
            <td>{Settings.getPriceFromClass(menuitem.priceClass)}€</td>
            <td>{menuitem.weight}g</td>
        </tr>)
    }
})
