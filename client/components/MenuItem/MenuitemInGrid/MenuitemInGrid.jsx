MenuitemInGrid = React.createClass({

    updateText(e) {
        var fieldName = $(e.target).attr('name')
        var fieldValue = $(e.target).val()
        var itemId = this.props.menuitem._id
        Meteor.call('menuitemTemplate--updateField', itemId, fieldName, fieldValue)
    },

    getInitialState() {
        return {}
    },

    publish(e) {
        Meteor.call('menuitemTemplate--publish', this.props.menuitem._id)
    },

    unpublish(e) {
        Meteor.call('menuitemTemplate--unpublish', this.props.menuitem._id)
    },

    deleteMenuitem(e) {
        var c = confirm('Kindel, et soovid kustutada toidu "' + this.props.menuitem.title + '"?')
        if (c)
            Meteor.call('menuitemTemplate--delete', this.props.menuitem._id)
    },

    removeFromOrder(e) {
        Meteor.call('menuitemInOrder--removeItem', this.props.menuitem._id)
    },

    nextFood(e) {
        Meteor.call("menuitemInOrder--switchItem", this.props.menuitem._id)
    },

    uploadComplete(path, filename) {
        var itemId = this.props.menuitem._id
        Meteor.call('menuitemTemplate--updateField', itemId, 'image.path', path)
        Meteor.call('menuitemTemplate--updateField', itemId, 'image.filename', filename)
    },

    render() {
        var menuitem = this.props.menuitem
        menuitem.image = menuitem.image || {}
        var menuitemKey = this.props.menuitemKey
        var extraSections = []
        var isManager = Roles.userIsInRole(Meteor.userId(), 'manager')
        var errors = menuitem.errors || {}

        if (menuitem.inorder) {
            if (menuitem.chefId === Meteor.userId())
                extraSections.push(<MenuitemInGridChef key={2} menuitem={menuitem}/>)
            else if (menuitem.originalSpecifications)
                extraSections.push(<MenuitemInGridButtonSection key={1} label="Vaheta" onClick={this.nextFood} colored={true}/>)
        } else {
            if (isManager || menuitem.managerComments) {
                extraSections.push(<div className="padding" key={5}><TextInput
                    disabled={!isManager}
                    label="Manager comments"
                    value={menuitem.managerComments}
                    rows="1"
                    name="managerComments"
                    onBlur={this.updateText}
                    errorMsg={errors.managerComments}/></div>)
            }
            if (!menuitem.published) {
                extraSections.push(<MenuitemInGridButtonSection key={3} label="avalikusta" onClick={this.publish} accented={true}/>)
            } else {
                extraSections.push(<MenuitemInGridTextSection key={4} text="Toit on avalik" className="greenBack"/>)
            }
        }


        var options = []
        if (menuitem.inorder) {
            options.push({ label: 'remove from order', onClick: this.removeFromOrder})
        } else if (menuitem.published) {
            options.push({ label: 'change', onClick: this.unpublish})
        } else if (!menuitem.published && !menuitem.inorder) {
            options.push({ label: 'delete', onClick: this.deleteMenuitem})
        }

        // Render
        return(
        <div className="MenuitemGrid mdl-shadow--2dp paper mdl-cell mdl-cell--4-col">
            <CornerMenu options={options}/>
            <section style={{minHeight: "230px"}}>
                <Imgix path={menuitem.image.path} filename={menuitem.image.filename}/>
                {menuitem.published ? null : <FileUpload path="uploads/images/menuitems" onComplete={this.uploadComplete}/>}
            </section>
            <MenuitemInGridDetails menuitem={menuitem}/>
            {extraSections}
        </div>)
    }
})
