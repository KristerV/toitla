import React from 'react';
Layout = React.createClass({

    shouldComponentUpdate() {
        $('.mdl-layout__drawer.is-visible').removeClass('is-visible')
        $('.mdl-layout__obfuscator.is-visible').removeClass('is-visible')
        return true
    },

    render() {
        var isManager = Roles.userIsInRole(Meteor.userId(), 'manager')
        var isChef = Roles.userIsInRole(Meteor.userId(), 'chef')

        var linksObj = {}
        if (isManager) {
            linksObj['Settings'] = '/settings'
            linksObj['Forums'] = 'http://spice.toitla.com'
            linksObj['Stats'] = '/stats'
            linksObj['Orders'] = '/orders'
            linksObj['Menus'] = '/menus'
            linksObj['Users'] = '/users'
        }

        if (isChef) {
            linksObj['Forums'] = 'http://spice.toitla.com'
            linksObj['Orders'] = '/orders'
            linksObj['My Menu'] = "/menu/"+Meteor.userId()
            linksObj['My Profile'] = "/profile/"+Meteor.userId()
        }

        var links = _.map(linksObj, (val, key) => {
            return <a key={val+key} className="mdl-navigation__link" href={val}>{key}</a>
        })

        var title = <a className="mdl-navigation__link mdl-layout-title" style={{fontSize: "1.6rem"}} href="/home">Toitla</a>
        var currentPath = FlowRouter.current().path

        // wrapper div fixes issue: https://github.com/facebook/react-devtools/issues/273
        return(<div>
            <div className={"mdl-layout mdl-js-layout"}>
                <header className="mdl-layout__header mdl-layout--no-desktop-drawer-button">
                    <div className="mdl-layout__header-row mdl-layout--large-screen-only">
                        {title}
                        <div className="mdl-layout-spacer"></div>
                        <nav className="mdl-navigation">{links}</nav>
                    </div>
                </header>
                <div className={"mdl-tabs mdl-js-tabs mdl-js-ripple-effect " + (this.props.tabs ? "mdl-layout__header" : "")} style={{minHeight: '0px'}}>
                    <div className="mdl-layout__tab-bar" style={{height: "auto", borderBottom: "none", justifyContent: "center", paddingLeft: "140px", width: "calc(100% - 140px)"}}>
                        {_.map(this.props.tabs, function(tab, i){
                            var newPath = currentPath.replace(this.props.activeTab, tab.route);
                            var isActive = tab.route === this.props.activeTab ? 'is-active' : "";
                            return <a key={i} href={newPath} className={"mdl-layout__tab "+isActive}>{tab.label}</a>
                        }.bind(this))}
                    </div>
                    <div className="text-center absolute w100">
                        {this.props.navbarBottom}
                    </div>
                </div>
                <div className="mdl-layout__drawer">
                    {title}
                    <nav className="mdl-navigation">{links}</nav>
                </div>
                <main className="mdl-layout__content h100 relative">
                    <div className="page-content h100 relative">{this.props.content}</div>
                </main>
            </div>
        </div>)

    }
})
