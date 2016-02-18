OrderManagerSigns = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("menuitems_inorder", this.props.orderId)
        var menuitems = MenuitemsInOrder.find({orderId: this.props.order._id})

        return {
            menuitems: menuitems.fetch(),
            subsReady: subscription.ready()
        }
    },

    render() {
        if (!this.data.subsReady)
            return <Loader/>
        var menuitems = this.data.menuitems

        var rows = 1
        var cols = 2
        var backFace = true

        var signWidth = (100 / cols) + "%"
        var signHeight = (100 / rows) + "%"

        var pages = []
        var nrPerPage = rows * cols
        var nrPages = Math.ceil(menuitems.length / nrPerPage)
        for (var i = 0; i < nrPages; i++) {
            var pageContent = []
            for (var j = 0; j < nrPerPage; j++) {
                var item = menuitems[i+j]
                if (!item) break
                pageContent.push(<div key={item._id} style={{width: signWidth, height: signHeight, display: "inline-block"}}>
                    <Sign menuitem={item} backFace={backFace}/>
                </div>)
            }
            pages.push(<div key={i} className="sign-page center">{pageContent}</div>)
        }

        return(<div className="sign-layout max-width margin-top margin-bottom">
            <h3 className="text-center text-white">Printing center</h3>
            <div className="center" style={{width: "200px"}}>
                <button className="w100 mdl-button mdl-button--raised mdl-button--accent" onClick={G.print}>open printing dialog</button>
            </div>
            <div id="printable-container">
                <div id="printable-content">
                    {pages}
                </div>
            </div>
        </div>)
    }
})
