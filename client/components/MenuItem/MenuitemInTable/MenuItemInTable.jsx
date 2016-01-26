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

    render() {
        var menuitem = this.props.menuitem
        var user = this.data.user
        if (user && user.profile)
            var profileName = user.profile.name
        var isChef = Roles.userIsInRole(user._id, 'chef') && !Roles.userIsInRole(user._id, 'manager')
        var id = menuitem.templateId || menuitem._id // inorder || template
        errors = menuitem.errors || {}

        var options = []
        if (menuitem.inorder) {
            options.push({ label: 'remove from order', onClick: this.removeFromOrder})
        } else if (!menuitem.published && !menuitem.inorder) {
            options.push({ label: 'delete', onClick: this.deleteMenuitem})
        }

        var priceHistory = _.sortBy(menuitem.priceHistory, (item) => { return item.date }).reverse()
        if (priceHistory.length > 1 && moment(priceHistory[0].date).isAfter(moment().subtract(1, 'month'))) {
            var priceChangeClass = ""
            var lastPrice = priceHistory[1].price
            if (menuitem.price > lastPrice)
                priceChangeClass = "bg-red"
            else if (menuitem.price < lastPrice)
                priceChangeClass = "bg-green"
        }
        priceHistory = priceHistory.map((item, i) => {
            return <p key={i}><span className="text-halfsize">{moment(item.date).format("DD.MM.YY")}</span> {item.price}€</p>
        })

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
            <td className="mdl-data-table__cell--non-numeric">
                <div id={"price-tooltip-"+id} className={priceChangeClass}>{menuitem.price}€</div>
                {!isChef ? <div
                    className="mdl-tooltip"
                    htmlFor={"price-tooltip-"+id}
                    style={{whiteSpace: "normal"}}>
                    {priceHistory}
                </div> : null}
            </td>
            <td>{menuitem.weight}g</td>
            {!isChef ? <td><CornerMenu options={options}/></td> : null}
        </tr>)
    }
})
