import DropDownMenu from 'material-ui/DropDownMenu';

import React from 'react';
DropDownMUI = React.createClass({

    onChange(e, i, value) {
        this.props.onChange({
            value: value,
            name: this.props.name,
            text: e.target.textContent,
        })
    },

    render() {
        var disabled = this.props.disabled

        // STYLES
        var style = {}
        var divStyle = {display: "inline-block"}
        var underlineStyle = {margin: "-2px 0 0 0"}
        var iconStyle = {right: 0}
        if (!this.props.autoWidth) {
            style.width = '100%'
            divStyle.width = '100%'
        }
        if (disabled) {
            iconStyle['opacity'] = 0
            underlineStyle['opacity'] = 0
        }
        if (this.props.errorMsg)
            underlineStyle['borderColor'] = 'rgb(222, 50, 38)'
        _.extend(style, this.props.style)

        // CLASSES
        var divClass = "dropdown"
        if (disabled)
            divClass += " disabled"

        return(<div style={divStyle} className={divClass}>
            <DropDownMenu
                autoWidth={this.props.autoWidth}
                menuItemStyle={this.props.menuItemStyle}
                underlineStyle={underlineStyle}
                iconStyle={iconStyle}
                labelStyle={{paddingLeft: "2px", color: "black"}}
                style={style}
                disabled={this.props.disabled}
                onChange={this.onChange}
                value={this.props.value}
            >
                {this.props.menuItems.map((item, i) => {
                    return <MenuItem value={item.value} primaryText={item.text} key={i}/>
                })}
            </DropDownMenu>
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
