OrderManagerStatus = React.createClass({
    render() {
        return(<div className="max-width margin-top mdl-grid">
            <h3 className="text-white text-center w100">Order checklist</h3>
            <h5 className="text-white text-center w100">Tick the items that signify the order process</h5>
            <div className="mdl-cell mdl-cell--6-col">
                <h3 className="text-white text-center">Status</h3>
                <Checklist/>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
                <h3 className="text-white text-center">Menu compilation</h3>
                <Checklist/>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
                <h3 className="text-white text-center">Chef on-boarding</h3>
                <Checklist/>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
                <h3 className="text-white text-center">Inventory</h3>
                <Checklist/>
            </div>
            <div className="mdl-cell mdl-cell--6-col">
                <h3 className="text-white text-center">Serving</h3>
                <Checklist/>
            </div>
        </div>)
    }
})
