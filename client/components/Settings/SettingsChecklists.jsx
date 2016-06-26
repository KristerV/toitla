import React from 'react';
SettingsChecklists = React.createClass({

    render() {
        return <div className="max-width margin-top mdl-grid">
            <h3 className="text-white text-center w100">Checklists settings</h3>
            {Settings.checklists.map(checklist => {
                return <div key={checklist.name} className="mdl-cell mdl-cell--6-col">
                    <h3 className="text-white text-center">{checklist.label}</h3>
                    <div className="paper padding">
                        <Checklist
                            collectionName="settings"
                            docId="checklists"
                            datapath={checklist.name}
                            />
                    </div>
                </div>
            })}
        </div>
    }

})
