Layout = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            user: Meteor.user(),
        }
    },

    shouldComponentUpdate() {
        $('.mdl-layout__drawer.is-visible').removeClass('is-visible')
        $('.mdl-layout__obfuscator.is-visible').removeClass('is-visible')
        return true
    },

    goNewOrder(e) {
        Order.createOrder()
    },

    render() {
        var changingLinks = []
        var user = this.data.user || {isManager:function(){return false}}
        if (user.isManager()) {
            changingLinks.push(<a key={2} className="mdl-navigation__link" href="/orders">Orders</a>)
            changingLinks.push(<a key={1} className="mdl-navigation__link" href="/users">Users</a>)
        }

        var links = <nav className="mdl-navigation">
            {changingLinks}
            <a className="mdl-navigation__link" href={"/menu/"+user._id}>Menu</a>
            <a className="mdl-navigation__link" href={"/profile/"+user._id}>Profile</a>
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={this.goNewOrder}>new order</button>
        </nav>

        var title = <a className="mdl-navigation__link mdl-layout-title" style={{fontSize: "1.6rem"}} href="/home">Toitla</a>

        // wrapper div fixes issue: https://github.com/facebook/react-devtools/issues/273
        return(<div>
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    {title}
                    <div className="mdl-layout-spacer"></div>
                    {links}
                </div>
            </header>
            <div className="mdl-layout__drawer">
                {title}
                {links}
            </div>
            <main className="mdl-layout__content h100 relative">
                <div className="page-content h100 relative">{this.props.content}</div>
            </main>
        </div>
        </div>)

    }
})
