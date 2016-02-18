Checklist = React.createClass({

    componentWillMount() {
        Meteor.call('Settings--startChecklist', this.props.collectionName, this.props.docId, this.props.datapath)
    },

    resetChecklist() {
        if (confirm("Delete all current entries and start over?"))
            Meteor.call('Settings--resetChecklist', this.props.collectionName, this.props.docId, this.props.datapath)
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subs = this.props.collectionName
        if (subs === 'users')
            subs = 'allUserData'
        var subscription = Meteor.subscribe(subs)
        var collection = Mongo.Collection.get(this.props.collectionName)
        if (!collection)
            throw new Meteor.Error(500, "No such collection exists");
        var doc = collection.findOne(this.props.docId)
        if (doc)
            var checklist = doc[this.props.datapath]

        return {
            checklist: checklist,
            subsReady: subscription.ready()
        }
    },

    addItem(e) {
        var index = Number($(e.target).parents('[data-index]').attr('data-index'))
        if (!index) index = 0 // zero plus button is different
        Meteor.call('Settings--addItemToChecklist', this.props.collectionName, this.props.docId, this.props.datapath, index)
    },

    render() {
        var checklist = this.data.checklist
        var disabled = this.props.disabled
        if (!checklist)
            return <Loader/>
        return(<div className="text-center margin-top w100">
            <CornerMenu options={[{label: "Reset checklist", onClick: this.resetChecklist}]}/>
            {this.getAddButton(0)}
            {checklist.map((item, i) => {
                i++
                return <div key={item._id} data-index={i}>
                    <ChecklistItem {...this.props} item={item} onEnter={this.addItem}/>
                    {this.getAddButton(i)}
                </div>
            })}
        </div>)
    },

    getAddButton(i) {
        if (!this.props.disabled)
            return <button className="relative z1 h0 mdl-button mdl-js-button mdl-button--icon block center" onClick={this.addItem}>
                <i style={{opacity: "0.4"}} className="material-icons">add</i>
            </button>
    }

})
