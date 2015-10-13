MenuItemDetails = React.createClass({

    getInitialState() {
        return {}
    },

    render() {

        // Render
        // colors are the last of each palette, from:
        // https://www.google.com/design/spec/style/color.html#color-color-palette
        return(<div>
            <p>Laura Telliskivi</p>
            <TextInput label="Toidu nimetus" value="Iduvõileib kukeseentega"/>
            <TextInput label="Koostisosad" rows="1"/>
            <Tag label="lihavaba" active={true} color="#64DD17"/>
            <Tag label="vegan" active={false} color="#00C853"/>
            <Tag label="toor" active={true} color="#00BFA5"/>
            <Tag label="gluteenivaba" active={false} color="#0091EA"/>
            <Tag label="laktoosivaba" active={true} color="#2962FF"/>
        </div>)
    }
})
