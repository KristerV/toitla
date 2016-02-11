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

    deleteMenuitem(e) {
        var c = confirm('Kindel, et soovid kustutada toidu "' + this.props.menuitem.title + '"?')
        if (c)
            Meteor.call('menuitemTemplate--delete', this.props.menuitem._id)
    },

    removeFromOrder(e) {
        Meteor.call('menuitemInOrder--removeItem', this.props.menuitem._id)
    },

    toggleConfirm(e) {
        var itemId = this.props.menuitem._id
        if (this.props.menuitem.chefConfirmed)
            Meteor.call('menuitemInOrder--removeConfirm', itemId)
        else
            Meteor.call('menuitemInOrder--confirm', itemId)
    },

    toggleInOrder(e) {
        var itemId = this.props.menuitem.inorder ? this.props.menuitem._id : this.props.menuitem.inOrderItemId
        var addMenuitemsMode = FlowRouter.current().route.name === 'menus-addItem'
        if (itemId) {
            if (addMenuitemsMode || confirm("Remove food from order?"))
                Meteor.call('menuitemInOrder--removeItem', itemId)
        } else
            Meteor.call('menuitemInOrder--addItem', FlowRouter.getParam("orderId"), this.props.menuitem._id)
    },

    render() {
        var addMenuitemsMode = FlowRouter.current().route.name === 'menus-addItem'
        var menuitem = this.props.menuitem
        var chefConfirmMode = menuitem.inorder
        var id = menuitem.templateId || menuitem._id // inorder || template
        errors = menuitem.errors || {}

        // User variables
        var user = this.data.user
        if (user && user.profile)
            var profileName = user.profile.name
        var isChef = Roles.userIsInRole(Meteor.userId(), 'chef') && !Roles.userIsInRole(Meteor.userId(), 'manager')

        // Row color
        var trClass = "paper padding clickable  "
        if (!menuitem.history || menuitem.history.length <= 1)
            trClass = "bg-green "

        // Hidden options
        var options = []
        if (menuitem.inorder)
            options.push({ label: 'remove from order', onClick: this.removeFromOrder})
        else if (!menuitem.published && !menuitem.inorder)
            options.push({ label: 'delete', onClick: this.deleteMenuitem})

        // Show price history
        var prevMenuitem = menuitem.history[menuitem.history.length - 2]
        if (prevMenuitem) {
            var priceClass = ""
            var weightClass = ""
            if (moment(prevMenuitem.publishDate).isAfter(moment().subtract(20, 'days'))) {
                if (menuitem.price > prevMenuitem.price)
                    priceClass = "bg-red"
                else if (menuitem.price < prevMenuitem.price)
                    priceClass = "bg-green"
                if (menuitem.weight < prevMenuitem.weight)
                    weightClass = "bg-red"
                else if (menuitem.weight > prevMenuitem.weight)
                    weightClass = "bg-green"
            }
            var priceHistory = []
            var weightHistory = []
            menuitem.history.forEach((item, i) => {
                var date = moment(item.publishDate).format("DD.MM.YY")
                priceHistory.push(<p key={i}><span className="text-halfsize">{date}</span> {item.price}€</p>)
                weightHistory.push(<p key={i}><span className="text-halfsize">{date}</span> {item.weight}g</p>)
            })
            priceHistory.reverse()
            weightHistory.reverse()
        }

        return(<tr className={trClass} onClick={this.props.onClick} data-menuitem-id={id}>
            <td><Checkbox checked={menuitem.inOrderItemId || menuitem.inorder} onChange={this.toggleInOrder} defaultStyle={true}/></td>
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
                    style={{width: "35px"}}
                    label="pieces"
                    name="amount"
                    errorMsg={errors.amount}
                    onBlur={this.updateTextInOrder}
                    value={menuitem.amount}
                    disabled={isChef ? true : false}
                /></td>
            : null}
            <td className="mdl-data-table__cell--non-numeric">{menuitem.foodType}</td>
            <td className={"mdl-data-table__cell--non-numeric " + priceClass}>
                <div id={"price-tooltip-"+id}>{menuitem.price}€</div>
                {!isChef ? <div
                    className="mdl-tooltip"
                    htmlFor={"price-tooltip-"+id}
                    style={{whiteSpace: "normal"}}>
                    {priceHistory}
                </div> : null}
            </td>
            <td className={weightClass}>
                <div id={"weight-tooltip-"+id}>{menuitem.weight}g</div>
                {!isChef ? <div
                    className="mdl-tooltip"
                    htmlFor={"weight-tooltip-"+id}
                    style={{whiteSpace: "normal"}}>
                    {weightHistory}
                </div> : null}
            </td>
            {menuitem.inorder ? <td>
                <Checkbox
                    checked={menuitem.chefConfirmed}
                    onChange={this.toggleConfirm}
                    defaultStyle={true}
                    />
            </td> : null}
            {/*<td><CornerMenu options={options}/></td>*/}
        </tr>)
    }
})
