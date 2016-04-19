var {
    DatePicker,
    Styles,
} = MUI;
var { ThemeManager, LightRawTheme } = Styles;

DatePickerMUI = React.createClass({
    childContextTypes: { muiTheme: React.PropTypes.object, },
    getChildContext() { return { muiTheme: ThemeManager.getMuiTheme(LightRawTheme), } },

    getDateFormat: function(date) {
        if (!date) return null
        return moment(date).format('dd D. MMMM')
    },

    render() {
        var props = this.props
        var style = props.style || {}
        if (!props.autoWidth) {
            style.width = '100%'
        }
        return(<DatePicker
            name={props.name}
            floatingLabelText={props.label}
            minDate={props.minDate}
            onChange={props.onChange}
            defaultDate={props.defaultDate}
            autoOk={props.autoOk}
            textFieldStyle={style}
            formatDate={props.formatDate || this.getDateFormat}
            errorText={props.errorMsg}
        />)
    }
})
