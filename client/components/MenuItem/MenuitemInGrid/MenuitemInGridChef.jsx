import React from 'react';
MenuitemInGridChef = React.createClass({

    getInitialState() {
        return {}
    },

    render() {

        // Render
        return(
        <section className="padding">
            <h5 className="fleft">16. september, 18:00</h5>
            <h2 className="fright" style={{marginTop: "10px"}}>50€</h2>
            <p style={{color: "red"}} className="clear"><b>Allergiad:</b> karulauk, pesto, maasikas</p>
            <div className="mdl-grid">
                <button className="mdl-cell mdl-cell--6-col mdl-button mdl-js-button mdl-button--raised">Ei soovi</button>
                <button className="mdl-cell mdl-cell--6-col mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Teen ära</button>
            </div>
            <h4 style={{textAlign: "center"}}>Tellimus on vastu võetud.</h4>
            <p className="light-text"><i>Kui nüüd soovid ära öelda, pead Toitla meeskonnaga ühendust võtma: kati@toitla.com või 5144544.</i></p>
        </section>)
    }
})
