
MenuItemDetails = React.createClass({

    getInitialState() {
        return {}
    },

    switchTag(e) {
        var tag = $(e.target).attr('name')
        var itemId = this.props.menuitem._id
        Meteor.call('menuitemTemplate--switchTag', itemId, tag)
    },

    updateText(e) {
        var fieldName = $(e.target).attr('name')
        var fieldValue = $(e.target).val()
        var itemId = this.props.menuitem._id
        Meteor.call('menuitemTemplate--updateField', itemId, fieldName, fieldValue)
    },

    changeDropdown(result) {
        var itemId = this.props.menuitem._id
        Meteor.call('menuitemTemplate--updateField', itemId, result.name, result.value)
    },

    render() {
        var menuitem = this.props.menuitem
        var errors = menuitem.formErrors || {}
        var editMode = !menuitem.inorder && !menuitem.published

        // Placeholder
        if (!menuitem) {
            return <section className="padding details">
                <div className="placeholder padding">
                    <p>Eesnimi Perenimi</p>
                    <p>Ilus toidu pealkiri</p>
                    <p>Pikk ja detailne kirjeldus koostisosadest</p>
                    <Tag label="lihavaba" active={false} color="#64DD17"/>
                    <Tag label="vegan" active={false} color="#00C853"/>
                    <Tag label="toor" active={false} color="#00BFA5"/>
                    <Tag label="mahe" active={false} color="#8D6E63"/>
                    <Tag label="gluteenivaba" active={false} color="#0091EA"/>
                    <Tag label="laktoosivaba" active={false} color="#2962FF"/>
                </div>
            </section>
        }

        var user = Meteor.users.findOne(menuitem.chefId) || {profile: {}}

        // Render
        return(
            <section className="padding details">
                <div className="padding">
                    <p>{menuitem.chefName || user.profile.name}</p>
                    <TextInput
                        editMode={editMode}
                        label="Toidu nimetus"
                        value={menuitem.title}
                        name="title"
                        onBlur={this.updateText}
                        errorMsg={errors.title}/>
                    <TextInput
                        editMode={editMode}
                        label="Koostisosad"
                        value={menuitem.ingredients}
                        rows="1"
                        name="ingredients"
                        onBlur={this.updateText}
                        errorMsg={errors.ingredients}/>

                    {Settings.menuitemTags.map(function(tag, i){
                        var active = _.contains(menuitem.tags, tag.name)
                        if (menuitem.inorder && (!tag.public || !active)) return
                        return <Tag key={i}
                            label={tag.label}
                            editMode={editMode}
                            active={active}
                            name={tag.name}
                            color={tag.color}
                            onClick={this.switchTag}/>
                    }.bind(this))}
                </div>
                {this.getSpecifications()}
            </section>
        )
    },

    getSpecifications() {
        if (this.props.menuitem.inorder) {
            return <div></div>
        }
        return <div>
            <div className="w100">
                <div style={{width: '50%'}} className="inline vtop paddingr box">
                    <DropDown menuItems={[
                        {value: null, text: 'tüüp'},
                        {value: 'main', text: 'soolane'},
                        {value: 'dessert', text: 'magus'},
                        ]}
                        name="foodType"
                        editMode={editMode}
                        autoWidth={false}
                        selectedIndex={Settings.getIndexOfSetting('foodTypes', menuitem.foodType, true)}
                        onChange={this.changeDropdown}
                        errorMsg={errors.foodType}/>
                </div>
                <div style={{width: '50%'}} className="inline vtop paddingl box">
                    <DropDown menuItems={[
                        {value: null, text: 'Hinnaklass'},
                        {value: 'class1', text: 'Tükihind '+Settings.priceClasses.class1},
                        {value: 'class2', text: 'Tükihind '+Settings.priceClasses.class2},
                        {value: 'class3', text: 'Tükihind '+Settings.priceClasses.class3},
                        ]}
                        name="priceClass"
                        editMode={editMode}
                        autoWidth={false}
                        selectedIndex={Settings.getIndexOfSetting('priceClasses', menuitem.priceClass, true)}
                        onChange={this.changeDropdown}
                        errorMsg={errors.priceClass}/>
                </div>
            </div>
            <TextInput
                editMode={editMode}
                label="Kaal (g)"
                value={menuitem.weight}
                name="weight"
                onBlur={this.updateText}
                errorMsg={errors.weight}
            />
        </div>
    },
})
