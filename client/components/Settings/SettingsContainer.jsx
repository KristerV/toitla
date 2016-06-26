import React from 'react';
SettingsContainer = React.createClass({
    render() {

        switch (this.props.tab) {
            case "checklists": return <SettingsChecklists/>
            case "driver": return <SettingsDriver/>
        }

        return<h2 className="text-white text-center">Hmm, no such tab: {this.props.tab}</h2>
    }
})
