ChecklistItem = React.createClass({

    removeItem(e) {
        if (!this.props.disabled)
            Meteor.call('Settings--removeItemFromChecklist', this.props.collectionName, this.props.docId, this.props.datapath, this.props.item._id)
    },

    updateText(e) {
        if (!this.props.disabled)
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
                    disabled={this.props.disabled}
                />
            </div>
            {!this.props.disabled ?
                <div className="inblock" style={{width: "40px"}}>
                    <button className="mdl-button mdl-js-button mdl-button--icon" onClick={this.removeItem}>
                        <i style={{opacity: "0.4"}} className="material-icons" data-remove_id={item._id}>remove</i>
                    </button>
                </div>
            : null}
        </div>
    }
})
