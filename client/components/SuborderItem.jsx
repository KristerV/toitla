injectTapEventPlugin()

var {
    Paper,
    TextField,
    RaisedButton,
    FlatButton,
    Dialog,
    List,
    ListItem,
    Styles,
} = MUI;
var { ThemeManager, LightRawTheme } = Styles;

SuborderItem = React.createClass({

    getInitialState() {
        return {}
    },

    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
        }
    },

    componentWillMount() {
        ThemeManager.setPalette({
            disabledColor: "rgba(0,0,0,0.6)",
        })
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("suborders")
        var suborder = Suborders.findOne({_id: this.props.suborderId}) || {}

        return {
            suborder: suborder,
            subsReady: subscription.ready()
        }
    },

    removeSuborder(e) {
        var c = confirm("Kindel, et tahad kustutada alatellimuse?")
        if (c)
            this.data.suborder.remove(this.props.suborderId)
    },

    sendToChefDialog(e) {
        this.refs.sendToChefDialog.show()
    },

    removeChefFromOffer(e) {
        var c = confirm("Kindel, et soovid koka pakkumisest eemaldada?")
        if (c)
            this.data.suborder.updateField('currentChefId', null)
    },

    closeDialog(e) {
        this.refs.sendToChefDialog.dismiss()
    },

    declineOffer(e) {
        this.updateReply('declined')
    },

    acceptOffer(e) {
        this.updateReply('accepted')
    },

    updateReply(result) {
        this.updateChefField('repliedAt', TimeSync.serverTime())
        this.updateChefField('result', Settings.suborders.results[result])
    },

    changeFoodDescription(e) {
        this.updateChefField('foodDescription', e.target.value)
    },

    changeFoodComponents(e) {
        this.updateChefField('foodComponents', e.target.value)
    },

    updateChefField(field, value) {
        var field = 'chefs.'+this.data.suborder.currentChefId+'.'+field
        this.data.suborder.updateField(field, value)
    },

    render() {
        if (!this.data.subsReady)
            return <p>Loading suborder...</p>
        else if (_.isEmpty(this.data.suborder))
            return <h1>Alatellimust ei ole olemas :(</h1>

        var suborder = this.data.suborder

        suborder.chefs = suborder.chefs || {}
        var chef = suborder.chefs[suborder.currentChefId] || {}
        var userId = Meteor.userId()

        var allowedEditSuborders = suborder.allowedEdit(userId, 'root') // root is dummy field

        // Status
        var status
        if (chef.repliedAt)
            status = <p className="inline">{chef.result} <span className="foggy-text">({moment(chef.repliedAt).format("D. MMM HH:mm")})</span></p>
        else if (chef.seenAt)
            status = <p className="inline">nähtud <span className="foggy-text">({moment(chef.seenAt).format("D. MMM HH:mm")})</span></p>
        else if (chef.receivedAt)
            status = <p className="inline">vastu võetud <span className="foggy-text">({moment(chef.receivedAt).format("D. MMM HH:mm")})</span></p>
        else if (chef.sentAt)
            status = <p className="inline">saadetud <span className="foggy-text">({moment(chef.sentAt).format("D. MMM HH:mm")})</span></p>

        // sendToChef button
        var allowedEditCurrentChef = Suborder.allowedEdit(userId, 'currentChefId')
        if (allowedEditCurrentChef && suborder.currentChefId) {
            var sendToChefButton = <div className="padding">
                <RaisedButton
                    disabled={!allowedEditCurrentChef}
                    label="Võta kokalt pakkumine ära"
                    onClick={this.removeChefFromOffer}
                    />
                <br/><p className="inline">{chef.name}: </p>
                {status}
            </div>
        } else if (allowedEditCurrentChef) {
            var sendToChefButton = <div className="padding">
                <RaisedButton
                disabled={!allowedEditCurrentChef}
                primary={true}
                label="Saada kokale"
                onClick={this.sendToChefDialog}
                />
            </div>
        }

        // Chef details form
        var chefForm
        if (Suborder.allowedView(userId, 'chefs.:_id')
            && suborder.currentChefId
            && chef.result === 'accepted')
        {
            chefForm =
            <div className="padding">
                <TextField
                    multiline={true}
                    rows={1}
                    floatingLabelText="Pakutava toidu kirjeldus"
                    onChange={this.changeFoodDescription}
                    value={chef.foodDescription}
                    errorText={this.state['foodDescriptionError']}
                    disabled={!Suborder.allowedEdit(userId, 'chefs.:_id.foodDescription')}
                    />
                <TextField
                    multiline={true}
                    rows={1}
                    floatingLabelText="Koostisosad"
                    onChange={this.changeFoodComponents}
                    value={chef.foodComponents}
                    errorText={this.state['foodComponentsError']}
                    disabled={!Suborder.allowedEdit(userId, 'chefs.:_id.foodComponents')}
                    />
            </div>
        } else if (Suborder.allowedView(userId, 'chefs.:_id')
            && suborder.currentChefId)
        {
            chefForm =
            <div className="padding">
                <div className="margin inline">
                    <RaisedButton
                        disabled={!Suborder.allowedEdit(userId, 'chefs.:_id.result')}
                        label="Ei täida"
                        onClick={this.declineOffer}
                        secondary={true}/>
                </div>
                <div className="margin inline">
                    <RaisedButton
                        disabled={!Suborder.allowedEdit(userId, 'chefs.:_id.result')}
                        label="Täidan tellimuse"
                        onClick={this.acceptOffer}
                        primary={true}/>
                </div>
            </div>
        }

        // Render
        return(
            <div className="suborder">
                <Dialog
    				title="Saada kokale"
    				ref="sendToChefDialog"
                    >
    				<ChefsList suborder={suborder} closeDialog={this.closeDialog}/>
    			</Dialog>
                <Paper className="margin relative">
                    <div className="padding">
                        <FlatButton
                            disabled={!allowedEditSuborders}
                            className="absolute-right"
                            label="X"
                            onClick={this.removeSuborder}/>
                        <TextField
                            disabled={!allowedEditSuborders}
                            name="dueDate"
                            floatingLabelText="Ürituse aeg"
                            onChange={suborder.handleTextFieldChange.bind(suborder)}
                            value={suborder.dueDate}
                        />
                        <TextField
                            disabled={!allowedEditSuborders}
                            name="peopleCount"
                            floatingLabelText="Inimesi"
                            onChange={suborder.handleTextFieldChange.bind(suborder)}
                            value={suborder.peopleCount}
                        />
                        <TextField
                            disabled={!allowedEditSuborders}
                            name="price"
                            floatingLabelText="Hind (€)"
                            onChange={suborder.handleTextFieldChange.bind(suborder)}
                            value={suborder.price}
                        />
                        <TextField
                            disabled={!allowedEditSuborders}
                            name="orderDescription"
                            floatingLabelText="Tellimuse kirjeldus"
                            rows={1}
                            multiline={true}
                            onChange={suborder.handleTextFieldChange.bind(suborder)}
                            value={suborder.orderDescription}
                        />
                        <TextField
                            disabled={!allowedEditSuborders}
                            name="allergies"
                            floatingLabelText="Allergiad"
                            onChange={suborder.handleTextFieldChange.bind(suborder)}
                            value={suborder.allergies}
                            errorText="Tähelepanu!"
                            rows={1}
                            multiline={true}
                        />
                    </div>
                    <hr/>
                    {sendToChefButton}
                    {chefForm}
                </Paper>
            </div>)
    }
})
