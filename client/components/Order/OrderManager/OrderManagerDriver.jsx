OrderManagerDriver = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var chefIds = _.pluck(this.props.order.chefs, '_id')
        var find = {_id: {$in: chefIds}}

        var subscription = Meteor.subscribe("settings")
        var subscription2 = Meteor.subscribe("allUserData", find)

        var driverSettings = Settings.findOne('driver')
        var users = Meteor.users.find(find).fetch()

        return {
            users: users,
            driverSettings: driverSettings,
            subsReady: subscription.ready() && subscription2.ready()
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

    raiseWaypoint(e) {
        let index = $(e.target).index('.waypoint-ordering button')
        Meteor.call('Order--moveChefUp', this.props.order._id, index)
    },

    updateChefVisibility(e) {
        orderId = this.props.order._id
        arrayId = e.target.name
        field = 'hideFromDriver'
        value = !e.target.checked
        Meteor.call("Order--updateChefsArrayField", orderId, arrayId, field, value);
    },

    render() {
        if (!this.data.subsReady)
            return <Loader/>
        var order = this.props.order || {}
        order.driver = order.driver || {}
        var sms = this.data.driverSettings ? this.data.driverSettings.sms : null
        return(<div className="max-width margin-top mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">
                <h3 className="text-white text-center">Message to Driver</h3>
            </div>
            <div className="padding paper mdl-cell mdl-cell--6-col waypoint-ordering">
                <h5>Waypoints ordering</h5>
                <p className="text-hint">Click to move waypoint up, deselect checkbox to hide.</p>
                {order.chefs ? order.chefs.map(item => {
                    let chef = _.findWhere(this.data.users, {_id: item._id})
                    let name = chef.profile.name
                    let location = _.findWhere(chef.profile.locations, {_id: item.pickupLocation})

                    let text
                    if (!item.confirmed)
                        text = `Not confirmed (${name})`
                    else if (!item.pickupLocation)
                        text = `No pickup location (${name})`
                    else
                        text = `${location.address} (${name})`

                    return <div key={item._id}>
                        <Checkbox
                            style={{width: "10%"}}
                            defaultChecked={!item.hideFromDriver}
                            onChange={this.updateChefVisibility}
                            name={item._id}
                        />
                        <Button
                            label={text}
                            multiline={true}
                            accent={!item.confirmed || !item.pickupLocation}
                            style={{width: "90%"}}
                            onClick={this.raiseWaypoint}
                        />
                    </div>
                }) : null}
            </div>
            <div className="padding paper mdl-cell mdl-cell--6-col">
                <h5>Start and finish</h5>
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
            </div>
            <div className="padding paper mdl-cell mdl-cell--6-col">
                <h5>Actions</h5>
                <Button
                    label="rebuild text"
                    onClick={this.resetText}
                    raised={true}
                    colored={true}
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
            <div className="padding paper margin-top margin-bottom mdl-cell mdl-cell--12-col">
                <Toitla/>
                <Markdown>{order.driver.info}</Markdown>
            </div>
        </div>)
    }
})
