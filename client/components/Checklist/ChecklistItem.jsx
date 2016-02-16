ChecklistItem = React.createClass({

    isDisabled() {
        var text = this.props.item.text
        var setting = Settings.findByKey('checklists', 'name', this.props.datapath)
        if (setting)
            var isLocked = _.contains(setting.reserved, text)
        return isLocked || this.props.disabled
    },

    removeItem(e) {
        if (!this.isDisabled())
            Meteor.call('Settings--removeItemFromChecklist', this.props.collectionName, this.props.docId, this.props.datapath, this.props.item._id)
    },

    updateText(e) {
        if (!this.isDisabled())
            Meteor.call('Settings--updateItemInChecklist', this.props.collectionName, this.props.docId, this.props.datapath, this.props.item._id, 'text', e.target.value)
    },

    updateChecked(e) {
        Meteor.call('Settings--updateItemInChecklist', this.props.collectionName, this.props.docId, this.props.datapath, this.props.item._id, 'checked', e.target.checked)
    },

    render() {
        var item = this.props.item
        return <div>
            <div className="inblock" style={{width: "40px"}}>
                <Checkbox
                    defaultStyle={true}
                    checked={item.checked}
                    onChange={this.updateChecked}
                />
            </div>
            <div className="inblock" style={{width: "calc(100% - 80px)"}}>
                <TextInput
                    value={item.text}
                    onBlur={this.updateText}
                    disabled={this.isDisabled()}
                />
            </div>
            {!this.isDisabled() ?
                <div className="inblock" style={{width: "40px"}}>
                    <button className="mdl-button mdl-js-button mdl-button--icon" onClick={this.removeItem}>
                        <i style={{opacity: "0.4"}} className="material-icons" data-remove_id={item._id}>remove</i>
                    </button>
                </div>
            :
                <div className="inblock" style={{width: "40px"}}>
                    <button className="mdl-button mdl-js-button mdl-button--icon">
                        <i style={{opacity: "0.1"}} className="material-icons">locked</i>
                    </button>
                </div>}
        </div>
    }
})
