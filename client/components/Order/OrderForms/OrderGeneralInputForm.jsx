import React from 'react';
OrderGeneralInputForm = React.createClass({
    handleTextFieldChange(e) {
        this.props.order.handleTextFieldChange(e);
    },

    handleChangeCheckbox(e) {
        this.props.order.handleChangeCheckbox(e);
    },

    render() {
        if (!this.props.order) {
            return(<Loader/>);
        }

        var props = this.props;
        var order = props.order;
        order.extra = order.extra || {};
        order.errors = order.errors || {};

        return(<div>
                <div className="paper margin padding">
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                    <Checkbox
                        name="extra.hotDrinks"
                        label={T.order.form.extra.hotDrinks()}
                        onChange={this.handleChangeCheckbox}
                        defaultChecked={order.extra.hotDrinks}
                    />
                    <Checkbox
                        name="extra.alcoholFreeDrinks"
                        label={T.order.form.extra.alcoholFreeDrinks()}
                        onChange={this.handleChangeCheckbox}
                        style={{paddingBottom: '10px'}}
                        defaultChecked={order.extra.alcoholFreeDrinks}
                    />
                    <TextInput
                        label={T.order.form.extra.info()}
                        name={props.inputName}
                        onBlur={this.handleTextFieldChange}
                        value={props.inputValue}
                        errorMsg={props.inputErrorMsg}
                        rows={props.inputRows} />
                </div>
                {this.props.buttons}
        </div>)
    }
});
