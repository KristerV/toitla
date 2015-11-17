OrderMenuForm = React.createClass({
    handlePriceChange(e) {
        console.log(e.target.value);
    },
    render() {
        return(<div className="paper margin padding">
            <h5 className="text-hint text-center">fancymeter</h5>
            <input
                className="mdl-slider mdl-js-slider"
                type="range"
                min="0"
                defaultValue="1"
                max="2"
                step="1"
                onChange={this.handlePriceChange}
                />
            <br/>
            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-1">
                <input type="checkbox" id="checkbox-1" className="mdl-checkbox__input" />
                <span className="mdl-checkbox__label">{T("order","serve_coffee")}</span>
            </label>
            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-2">
                <input type="checkbox" id="checkbox-2" className="mdl-checkbox__input" />
                <span className="mdl-checkbox__label">{T("order","servers_needed")}</span>
            </label>
            <br/>
            <h4 className="text-center">Get this menu for 350€</h4>
        </div>)
    }
})
