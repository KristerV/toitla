Checklist = React.createClass({

    componentWillMount() {
        Meteor.call('Settings--startChecklist', this.props.collectionName, this.props.docId, this.props.datapath)
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe(this.props.collectionName)
        var collection = Mongo.Collection.get(this.props.collectionName)
        var doc = collection.findOne(this.props.docId)
        if (doc)
            var checklist = doc[this.props.datapath]

        return {
            checklist: checklist,
            subsReady: subscription.ready()
        }
    },

    addItem(e) {
        var index = Number($(e.target).attr('data-index'))
        Meteor.call('Settings--addItemToChecklist', this.props.collectionName, this.props.docId, this.props.datapath, index)
    },

    render() {
        var checklist = this.data.checklist
        if (!checklist)
            return <Loader/>
        return(<div className="paper padding text-center">
            {this.getAddButton(0)}
            {checklist.map((item, i) => {
                return <div key={item._id}>
                    <ChecklistItem {...this.props} item={item} key={item._id}/>
                    {this.getAddButton(i+1)}
                </div>
            })}
        </div>)
    },

    getAddButton(i) {
        return <button className="relative z1 h0 mdl-button mdl-js-button mdl-button--icon block center" onClick={this.addItem}>
            <i style={{opacity: "0.4"}} className="material-icons" data-index={i}>add</i>
        </button>
    }

})
