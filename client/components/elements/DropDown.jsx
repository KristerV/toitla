// injectTapEventPlugin()

var {
    DropDownMenu,
    Styles,
} = MUI;
var { ThemeManager, LightRawTheme } = Styles;

DropDown = React.createClass({
    childContextTypes: { muiTheme: React.PropTypes.object, },
    getChildContext() { return { muiTheme: ThemeManager.getMuiTheme(LightRawTheme), } },

    onChange(e, i, obj) {
        this.props.onChange({
            value: obj.value,
            name: this.props.name,
            text: obj.text,
        })
    },

    render() {
        var editMode = this.props.editMode

        // STYLES
        var style = {}
        var divStyle = {display: "inline-block"}
        var underlineStyle = {margin: "-2px 0 0 0"}
        var iconStyle = {right: 0}
        if (!this.props.autoWidth) {
            style.width = '100%'
            divStyle.width = '100%'
        }
        if (!editMode) {
            iconStyle['opacity'] = 0
            underlineStyle['opacity'] = 0
        }
        _.extend(style, this.props.style)

        // CLASSES
        var divClass = "dropdown"
        if (!editMode)
            divClass += " disabled"

        return(<div style={divStyle} className={divClass}><DropDownMenu
            displayMember={this.props.displayMember}
            valueMember={this.props.valueMember || 'value'}
            autoWidth={this.props.autoWidth}
            menuItems={this.props.menuItems}
            menuItemStyle={this.props.menuItemStyle}
            selectedIndex={this.props.selectedIndex}
            underlineStyle={underlineStyle}
            iconStyle={iconStyle}
            labelStyle={{paddingLeft: "2px", color: "black"}}
            style={style}
            disabled={!this.props.editMode}
            onChange={this.onChange}
            />
            <span style={{
                color: "rgb(222, 50, 38)",
                position: "relative",
                fontSize: "12px",
                top: "-6px",
                display: "block",
                paddingLeft: "2px",
            }}>{this.props.errorMsg}</span>
        </div>)
    }
})
