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
        return(<div style={{display: "inline-block"}}><DropDownMenu
            displayMember={this.props.displayMember}
            valueMember={this.props.valueMember || 'value'}
            autoWidth={this.props.autoWidth}
            menuItems={this.props.menuItems}
            menuItemStyle={this.props.menuItemStyle}
            selectedIndex={this.props.selectedIndex}
            underlineStyle={this.props.underlineStyle}
            iconStyle={this.props.iconStyle}
            labelStyle={this.props.labelStyle}
            style={this.props.style}
            disabled={this.props.disabled}
            onChange={this.onChange}
            />
            <span style={{
                color: "rgb(222, 50, 38)",
                position: "relative",
                fontSize: "12px",
                top: "-6px",
                display: "block",
                paddingLeft: "24px",
            }}>{this.props.errorMsg}</span>
        </div>)
    }
})
