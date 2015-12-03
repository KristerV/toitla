MenuItemsListItem = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("allUserData")
        var user = Meteor.users.findOne(this.props.menuitem.chefId)
        return {
            user: user,
        }
    },

    render() {
        var menuitem = this.props.menuitem
        if (this.data.user && this.data.user.profile)
            var chefName = this.data.user.profile.name
        return(<tr className="paper padding">
            <td>{chefName}</td>
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
