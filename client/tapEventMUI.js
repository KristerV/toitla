import injectTapEventPlugin from 'react-tap-event-plugin';

Meteor.startup(() => {
	injectTapEventPlugin()
})