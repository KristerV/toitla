
var {
    TimePicker,
    Styles,
} = MUI;
var { ThemeManager, LightRawTheme } = Styles;

TimePickerMUI = React.createClass({
    childContextTypes: { muiTheme: React.PropTypes.object, },
    getChildContext() { return { muiTheme: ThemeManager.getMuiTheme(LightRawTheme), } },

    getTimeFormat: function(date) {
        if (!date) {
            date = new Date();
            date.setHours(0,0,0,0);
        }
        return moment(date).format('H:mm')
    },

    render() {
        var props = this.props
        var style = props.style || {}
        if (!props.autoWidth) {
            style.width = '100%'
        }
        return(<TimePicker
            name={props.name}
            floatingLabelText={props.label}
            format="24hr"
            onChange={props.onChange}
            defaultTime={props.value}
            textFieldStyle={style}
            errorText={props.errorMsg}
        />)
    }
})
