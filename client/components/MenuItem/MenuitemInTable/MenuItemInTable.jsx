MenuitemInTable = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("allUserData")
        var user = Meteor.users.findOne(this.props.menuitem.chefId, {fields: {profile: 1}})
        return {
            subsReady: subscription.ready(),
            user: user,
        }
    },

    updateTextInOrder(e) {
        var fieldName = $(e.target).attr('name')
        var fieldValue = $(e.target).val()
        var itemId = this.props.menuitem._id
        Meteor.call('menuitemInOrder--updateField', itemId, fieldName, fieldValue)
    },

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
        var user = this.data.user
        if (user && user.profile)
            var profileName = user.profile.name
        errors = menuitem.errors || {}
        return(<tr className="paper padding" onClick={this.tickChecbox} data-menuitem-id={menuitem._id}>
            {this.props.checkboxes ? <td><Checkbox name="Tere" id={menuitem._id} /></td> : null}
            <td>{menuitem.chefName || profileName}</td>
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
            <td>{menuitem.amount ?
                <TextInput
                    style={{width: "30px"}}
                    label="pieces"
                    name="amount"
                    errorMsg={errors.amount}
                    onBlur={this.updateTextInOrder}
                    value={menuitem.amount}
                />
            : null}</td>
            <td>{menuitem.foodType}</td>
            <td>{Settings.getPriceFromClass(menuitem.priceClass)}€</td>
            <td>{menuitem.weight}g</td>
        </tr>)
    }
})
