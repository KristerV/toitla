FilterDropdown = React.createClass({

    getInitialState() {
        return {activeEntries: []}
    },

    addItem(e) {
        var list = this.state.activeEntries
        var exists = _.findWhere(list, e)
        if (!exists) {
            list.push(e)
            this.setState({activeEntries: list})
            this.sendToParent(list)
        }
    },

    removeItem(e) {
        var list = this.state.activeEntries.filter(function(item){ return item.value !== e.value });
        this.setState({activeEntries: list})
        this.sendToParent(list)
    },

    sendToParent(list) {
        this.props.onChange({name: this.props.name, results: list, inputType: "dropdown"})
    },

    render() {
        var menuitems = this.props.menuItems
        menuitems.unshift({text: this.props.label, value: null})
        return(<div>
                <DropDownMUI
                    onChange={this.addItem}
                    name={this.props.name}
                    autoWidth={this.props.autoWidth}
                    menuItems={menuitems}
                    value={null}
                />
                <div className="dropdown-filter-list">
                    {this.state.activeEntries.map(function(item, i){
                        return <p
                            className="dropdown-filter-item clickable"
                            key={i}
                            onClick={this.removeItem.bind(this, item)}>
                                {item.text}
                            </p>
                    }.bind(this))}
                </div>
            </div>)
    }
})
