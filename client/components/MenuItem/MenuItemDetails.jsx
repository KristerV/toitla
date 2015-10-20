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
        Meteor.call('updateMenuitemText', itemId, fieldName, fieldValue)
    },

    render() {
        var menuitem = this.props.menuitem
        var content
        if (menuitem) {
            var user = Meteor.users.findOne(menuitem.chefId) || {profile: {}}
            content = <div>
                <p>{user.profile.name}</p>
                <TextInput
                    label="Toidu nimetus"
                    value={menuitem.title}
                    name="title"
                    onBlur={this.updateText}/>
                <TextInput
                    label="Koostisosad"
                    value={menuitem.ingredients}
                    rows="1"
                    name="ingredients"
                    onBlur={this.updateText}/>
                <Tag label="lihavaba"
                    active={_.contains(menuitem.tags, "meatfree")}
                    name="meatfree"
                    color="#64DD17"
                    onClick={this.switchTag}/>
                <Tag label="vegan"
                    active={_.contains(menuitem.tags, "vegan")}
                    name="vegan"
                    color="#00C853"
                    onClick={this.switchTag}/>
                <Tag label="toor"
                    active={_.contains(menuitem.tags, "raw")}
                    name="raw"
                    color="#00BFA5"
                    onClick={this.switchTag}/>
                <Tag label="gluteenivaba"
                    active={_.contains(menuitem.tags, "glutenfree")}
                    name="glutenfree"
                    color="#0091EA"
                    onClick={this.switchTag}/>
                <Tag label="laktoosivaba"
                    active={_.contains(menuitem.tags, "lactosefree")}
                    name="lactosefree"
                    color="#2962FF"
                    onClick={this.switchTag}/>
            </div>
        } else {
            content = <div className="placeholder">
                <p>Eesnimi Perenimi</p>
                <p>Ilus toidu pealkiri</p>
                <p>Pikk ja detailne kirjeldus koostisosadest</p>
                <Tag label="lihavaba" active={false} color="#64DD17"/>
                <Tag label="vegan" active={false} color="#00C853"/>
                <Tag label="toor" active={false} color="#00BFA5"/>
                <Tag label="gluteenivaba" active={false} color="#0091EA"/>
                <Tag label="laktoosivaba" active={false} color="#2962FF"/>
            </div>

        }


        // Render
        // colors are the last of each palette, from:
        // https://www.google.com/design/spec/style/color.html#color-color-palette
        return(
            <section className="padding details">
                {content}
            </section>
        )
    }
})
