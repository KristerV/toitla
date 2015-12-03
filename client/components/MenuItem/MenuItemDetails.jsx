
MenuItemDetails = React.createClass({

    updateText(e) {
        var fieldName = $(e.target).attr('name')
        var fieldValue = $(e.target).val()
        var itemId = this.props.menuitem._id
        Meteor.call('menuitemTemplate--updateField', itemId, fieldName, fieldValue)
    },

    updateTextInOrder(e) {
        var fieldName = $(e.target).attr('name')
        var fieldValue = $(e.target).val()
        var itemId = this.props.menuitem._id
        Meteor.call('menuitemInOrder--updateField', itemId, fieldName, fieldValue)
    },

    changeDropdown(result) {
        var itemId = this.props.menuitem._id
        Meteor.call('menuitemTemplate--updateField', itemId, result.name, result.value)
    },

    render() {
        var menuitem = this.props.menuitem
        var errors = menuitem.formErrors || {}
        var editDisabled = menuitem.inorder || menuitem.published

        var user = Meteor.users.findOne(menuitem.chefId) || {}
        user.profile = user.profile || {}

        // Render
        return(
            <section className="padding details">
                <div className="padding">
                    <p className="text-hint">{menuitem.chefName || user.profile.name}</p>
                    <TextInput
                        disabled={editDisabled}
                        label="Toidu nimetus"
                        value={menuitem.title}
                        rows="1"
                        name="title"
                        onBlur={this.updateText}
                        errorMsg={errors.title}/>
                    <TextInput
                        disabled={editDisabled}
                        label="Koostisosad"
                        value={menuitem.ingredients}
                        rows="1"
                        name="ingredients"
                        onBlur={this.updateText}
                        errorMsg={errors.ingredients}/>

                    <Tags
                        activeTags={menuitem.tags}
                        menuitemId={this.props.menuitem._id}
                        disabled={editDisabled}
                        onlyActive={editDisabled}
                    />
                    {menuitem.amount ?
                        <TextInput
                            label="pieces"
                            name="amount"
                            errorMsg={errors.amount}
                            onBlur={this.updateTextInOrder}
                            value={menuitem.amount}
                        />
                    : null}
                </div>
                {this.getSpecifications()}
            </section>
        )
    },

    getSpecifications() {
        if (this.props.menuitem.inorder && !Roles.userIsInRole(Meteor.userId(), 'manager')) {
            return <div></div>
        }
        var menuitem = this.props.menuitem
        var errors = menuitem.formErrors || {}
        var editDisabled = menuitem.inorder || menuitem.published
        return <div>
            <div className="w100">
                <div style={{width: '50%'}} className="inline vtop paddingr box">
                    <DropDownMUI menuItems={[
                        {value: null, text: 'tüüp'},
                        {value: 'main', text: 'soolane'},
                        {value: 'dessert', text: 'magus'},
                        {value: 'drink', text: 'jook'},
                        ]}
                        name="foodType"
                        disabled={editDisabled}
                        autoWidth={false}
                        selectedIndex={Settings.getIndexOfSetting('foodTypes', menuitem.foodType, true)}
                        onChange={this.changeDropdown}
                        errorMsg={errors.foodType}/>
                </div>
                <div style={{width: '50%'}} className="inline vtop paddingl box">
                    <DropDownMUI menuItems={[
                        {value: null, text: 'Hinnaklass'},
                        {value: 'class1', text: 'Tükihind '+Settings.priceClasses.class1},
                        {value: 'class2', text: 'Tükihind '+Settings.priceClasses.class2},
                        {value: 'class3', text: 'Tükihind '+Settings.priceClasses.class3},
                        ]}
                        name="priceClass"
                        disabled={editDisabled}
                        autoWidth={false}
                        selectedIndex={Settings.getIndexOfSetting('priceClasses', menuitem.priceClass, true)}
                        onChange={this.changeDropdown}
                        errorMsg={errors.priceClass}/>
                </div>
            </div>
            <TextInput
                disabled={editDisabled}
                label="Kaal (g)"
                value={menuitem.weight}
                name="weight"
                onBlur={this.updateText}
                errorMsg={errors.weight}
            />
        </div>
    },
})
