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

    render() {
        var menuitem = this.props.menuitem
        var user = this.data.user
        var id = menuitem.templateId || menuitem._id // inorder || template
        if (user && user.profile)
            var profileName = user.profile.name
        errors = menuitem.errors || {}
        return(<tr className="paper padding clickable" onClick={this.props.onClick} data-menuitem-id={id}>
            {this.props.checkboxes ?
                <td>
                    <Checkbox name="Tere" id={id} checked={this.props.checked} defaultStyle={this.props.defaultChecbox}/>
                </td>
            : null}
            <td className="mdl-data-table__cell--non-numeric">{menuitem.chefName || profileName}</td>
            <td className="wrap mdl-data-table__cell--non-numeric">{menuitem.title}</td>
            <td className="mdl-data-table__cell--non-numeric">
                <div id={"ingredients-tooltip-"+id} className="icon material-icons">receipt</div>
                <div
                    className="mdl-tooltip"
                    htmlFor={"ingredients-tooltip-"+id}
                    style={{whiteSpace: "normal"}}>
                    {menuitem.ingredients}
                </div>
            </td>
            <td className="wrap mdl-data-table__cell--non-numeric"><Tags activeTags={menuitem.tags} onlyActive={true}/></td>
            {menuitem.amount ?
                <td><TextInput
                    style={{width: "30px"}}
                    label="pieces"
                    name="amount"
                    errorMsg={errors.amount}
                    onBlur={this.updateTextInOrder}
                    value={menuitem.amount}
                /></td>
            : null}
            <td className="mdl-data-table__cell--non-numeric">{menuitem.foodType}</td>
            <td>{Settings.getPriceFromClass(menuitem.priceClass)}€</td>
            <td>{menuitem.weight}g</td>
        </tr>)
    }
})
