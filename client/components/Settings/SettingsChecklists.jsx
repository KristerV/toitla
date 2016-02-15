SettingsChecklists = React.createClass({

    render() {
        return <div className="max-width margin-top mdl-grid">
            <h3 className="text-white text-center w100">Order checklist</h3>
            <h5 className="text-white text-center w100">Tick the items that signify order progress</h5>
            {Settings.checklists.map(checklist => {
                return <div key={checklist.name} className="mdl-cell mdl-cell--6-col">
                    <h3 className="text-white text-center">{checklist.label}</h3>
                    <Checklist
                        collectionName="settings"
                        docId="checklists"
                        datapath={checklist.name}
                        />
                </div>
            })}
        </div>
    }

})
