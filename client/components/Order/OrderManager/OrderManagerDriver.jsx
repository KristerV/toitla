OrderManagerDriver = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("settings")
        var driverSettings = Settings.findOne('driver')

        return {
            driverSettings: driverSettings,
            subsReady: subscription.ready()
        }
    },

    resetText() {
        this.props.order.resetDriverInfo((err, result) => {
            if (err)
                console.error(err)
            // Manually set input value, TextInput is not reactive
            $('textarea[name="driver.info"]').val(result)
        })
    },

    updateText(e) {
        this.props.order.handleTextFieldChange(e)
    },

    componentWillMount() {
        if (!this.props.order.driver)
            this.props.order.resetDriverInfo()
    },

    sendLinkToFleep() {
        Meteor.call('sendDriverLink', G.getFullUrl(), this.props.order._id)
    },

    render() {
        var order = this.props.order || {}
        order.driver = order.driver || {}
        var sms = this.data.driverSettings ? this.data.driverSettings.sms : null
        return(<div className="max-width margin-top">
            <h3 className="text-white text-center">Message to Driver</h3>
            <div className="padding paper">
                <Checkbox
                    label="First stop is Toitla office"
                    onChange={order.handleChangeCheckbox.bind(order)}
                    name="driver.startOffice"
                    defaultChecked={order.driver.startOffice}
                />
                <TextInput
                     onBlur={this.updateText}
                     label="Finish directions"
                     value={order.driver.finishDirections}
                     name="driver.finishDirections"
                 />
                <TextInput
                     onBlur={this.updateText}
                     label="Finish latlong (from Google Maps)"
                     value={order.driver.finishLatlong}
                     name="driver.finishLatlong"
                 />
                <Button
                    label="rebuild text"
                    onClick={this.resetText}
                    raised={true}
                />
                <SingleClickButton
                    accent={true}
                    raised={true}
                    label="Send link to fleep"
                    labelDisabled="Link sent to fleep"
                    onClick={this.sendLinkToFleep}
                    className="margin-left"
                />
                <p className="margin-top">{sms ? `${sms}: ${G.getFullUrl()}` : `Driver Link: ${G.getFullUrl()}`} </p>
            </div>
            <div className="padding paper margin-top margin-bottom">
                {/*<TextInput
                 rows={1}
                 onBlur={this.updateText}
                 value={order.driver.info}
                 name="driver.info"
                 />*/}
                <Toitla/>
                <Markdown>{order.driver.info}</Markdown>
            </div>
        </div>)
    }
})
