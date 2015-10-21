
MenuItemDetails = React.createClass({

    getInitialState() {
        return {}
    },

    switchTag(e) {
        var tag = $(e.target).attr('name')
        var itemId = this.props.menuitem._id
        Meteor.call('switchMenuitemTag', itemId, tag)
    },

    updateText(e) {
        var fieldName = $(e.target).attr('name')
        var fieldValue = $(e.target).val()
        var itemId = this.props.menuitem._id
        Meteor.call('menuitem--updateField', itemId, fieldName, fieldValue)
    },

    changeDropdown(result) {
        var itemId = this.props.menuitem._id
        Meteor.call('menuitem--updateField', itemId, result.name, result.value)
    },

    render() {
        var menuitem = this.props.menuitem
        var errors = menuitem.formErrors || {}
        var editMode = Roles.userIsInRole(Meteor.userId(), 'manager') || (!menuitem.inorder && !menuitem.published)
        var content
        if (menuitem) {
            var user = Meteor.users.findOne(menuitem.chefId) || {profile: {}}
            content = <div>
                <p>{user.profile.name}</p>
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
                {/* colors are the last of each palette, from:                              */}
                {/* https://www.google.com/design/spec/style/color.html#color-color-palette */}
                <Tag label="lihavaba"
                    editMode={editMode}
                    active={_.contains(menuitem.tags, "meatfree")}
                    name="meatfree"
                    color="#64DD17"
                    onClick={this.switchTag}/>
                <Tag label="vegan"
                    editMode={editMode}
                    active={_.contains(menuitem.tags, "vegan")}
                    name="vegan"
                    color="#00C853"
                    onClick={this.switchTag}/>
                <Tag label="toor"
                    editMode={editMode}
                    active={_.contains(menuitem.tags, "raw")}
                    name="raw"
                    color="#00BFA5"
                    onClick={this.switchTag}/>
                <Tag label="mahe"
                    editMode={editMode}
                    active={_.contains(menuitem.tags, "eco")}
                    name="eco"
                    color="#8D6E63"
                    onClick={this.switchTag}/>
                <Tag label="gluteenivaba"
                    editMode={editMode}
                    active={_.contains(menuitem.tags, "glutenfree")}
                    name="glutenfree"
                    color="#0091EA"
                    onClick={this.switchTag}/>
                <Tag label="laktoosivaba"
                    editMode={editMode}
                    active={_.contains(menuitem.tags, "lactosefree")}
                    name="lactosefree"
                    color="#2962FF"
                    onClick={this.switchTag}/>
                <DropDown menuItems={[
                    {value: null, text: 'tüüp'},
                    {value: 'main', text: 'soolane'},
                    {value: 'dessert', text: 'magus'},
                    ]}
                    name="foodType"
                    selectedIndex={Settings.getIndexOfSetting('foodTypes', menuitem.foodType)}
                    onChange={this.changeDropdown}
                    errorMsg={errors.foodType}/>
                <DropDown menuItems={[
                    {value: null, text: 'Hinnaklass'},
                    {value: 'class1', text: 'Tükihind '+Settings.priceClasses.class1},
                    {value: 'class2', text: 'Tükihind '+Settings.priceClasses.class2},
                    {value: 'class3', text: 'Tükihind '+Settings.priceClasses.class3},
                    ]}
                    name="priceClass"
                    selectedIndex={Settings.getIndexOfSetting('priceClasses', menuitem.priceClass)}
                    onChange={this.changeDropdown}
                    errorMsg={errors.priceClass}/>
                <TextInput
                    editMode={editMode}
                    label="Kaal (g)"
                    value={menuitem.weight}
                    name="weight"
                    onBlur={this.updateText}
                    errorMsg={errors.weight}
                    />
            </div>
        } else {
            content = <div className="placeholder">
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
        }


        // Render
        return(
            <section className="padding details">
                {content}
            </section>
        )
    }
})
