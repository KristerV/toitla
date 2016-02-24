SettingsDriver = React.createClass({

	mixins: [ReactMeteorData],
	getMeteorData() {
		var subscription = Meteor.subscribe('settings')
		var driver = Settings.findOne('driver')

		return {
			driver: driver,
			subsReady: subscription.ready()
		}
	},

	updateText(e) {
		this.data.driver.handleTextFieldChange(e)
	},

	render() {
		if (!this.data.subsReady)
			return <Loader/>

		const driver = this.data.driver
        driver.message = driver.message || {}

		return <div className="max-width margin-top mdl-grid">
			<h3 className="text-white text-center w100">Driver settings</h3>
			<div className="paper padding">
				<TextInput
					rows={1}
					label="Intro"
					name="message.intro"
					value={driver.message.intro}
					onBlur={this.updateText}
				/>
				<TextInput
					rows={1}
					label="Outro"
					name="message.outro"
					value={driver.message.outro}
					onBlur={this.updateText}
				/>
			</div>
		</div>
	}

})
