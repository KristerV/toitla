MenuItemDetails = React.createClass({

    getInitialState() {
        return {}
    },

    render() {
        var menuitem = this.props.menuitem
        var content
        if (menuitem) {
            var user = Meteor.users.findOne(menuitem.chefId)
            content = <div>
                <p>{user.profile.name}</p>
                <TextInput label="Toidu nimetus" value="Iduvõileib kukeseentega"/>
                <TextInput label="Koostisosad" rows="1"/>
                <Tag label="lihavaba" active={true} color="#64DD17"/>
                <Tag label="vegan" active={false} color="#00C853"/>
                <Tag label="toor" active={true} color="#00BFA5"/>
                <Tag label="gluteenivaba" active={false} color="#0091EA"/>
                <Tag label="laktoosivaba" active={true} color="#2962FF"/>
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
        return(<section className="padding">{content}</section>)
    }
})
