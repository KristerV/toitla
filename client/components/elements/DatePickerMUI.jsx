import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import React from 'react';
DatePickerMUI = React.createClass({

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
        return(<MuiThemeProvider><DatePicker
            name={props.name}
            placeholder={props.label}
            minDate={props.minDate}
            onChange={props.onChange}
            defaultDate={props.defaultDate}
            autoOk={props.autoOk}
            textFieldStyle={style}
            formatDate={props.formatDate || this.getDateFormat}
            errorText={props.errorMsg}
        /></MuiThemeProvider>)
    }
})
