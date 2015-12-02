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
        var style= {display: "inline-block"}
        return(<div className="paper padding">
            <p style={style}>{chefName}</p>
            <div style={style}>{menuitem.title}
                <div id={"ingredients-tooltip-"+menuitem._id} className="icon material-icons">receipt</div>
                <div className="mdl-tooltip" htmlFor={"ingredients-tooltip-"+menuitem._id}>
                    {menuitem.ingredients}
                </div>
            </div>
            <div style={style}><Tags activeTags={menuitem.tags} onlyActive={true}/></div>
            <p style={style}>{menuitem.foodType}</p>
            <p style={style}>{Settings.getPriceFromClass(menuitem.priceClass)}€</p>
            <p style={style}>{menuitem.weight}g</p>
        </div>)
    }
})
