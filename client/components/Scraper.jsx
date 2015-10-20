
Scraper = React.createClass({

    getInitialState() {
        return {}
    },

    getDefaultProps() {
        return {}
    },

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("scrapes")
        return {
            scrapes: Scrapes.find({}, {sort: {dateAdded: 1, secSort: 1}}).fetch(),
            subsReady: subscription.ready()
        }
    },

    scrape: function(e){
        e.preventDefault()
        var link = $('input[name=scraper]').val()
        Meteor.call('scrape', link)
        $('input[name=scraper]').val("")
    },
    clear: function(){
        Meteor.call('clearScraper')
    },

    render() {
        var emails = []
        var data = []
        this.data.scrapes.forEach(function(item, i){
            if (item.type === 'links') {
                data.push(<tr key={i} style={{backgroundColor: "#ccc"}}><td colSpan="6">{item.link}</td></tr>)
            } else {
                if (item.email)
                    emails.push(item.email + ", ")
                data.push(<tr key={i}>
                    <td className={item.status}>{item.status}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.telephone}</td>
                    <td>{item.email}</td>
                    <td><a href={item.website}>{item.website}</a></td>
                </tr>)
            }
        })
        return(<div>
            <div className="mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 padding margin">Sisesta neti.ee link ja saa kontaktid kätte. <b style={{color: "red"}}>NB! Kätte saamine võtab aega ja iga päring koormab serverit</b>, seega ole ettevaatlik. (samas esimene peaks 20sek max võtma)
                <br/>
                <form onSubmit={this.scrape} className="inblock">
                    <input name="scraper" className="margin mdl-textfield__input inblock" placeholder="neti.ee link" type="text" style={{width: "200px"}}/>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" type="submit" value="scrape" onClick={this.scrape}>Scrape</button>
                </form>
                <button className="mdl-button mdl-js-button" value="clear" onClick={this.clear}>Clear data</button>
            </div>
            <div className="mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 padding margin">Kõik tabelis olevad emailid copy-paste sõbralikult: {emails}</div>
            <table className="mdl-data-table mdl-shadow--2dp margin">
                {data}
            </table>
        </div>)
    }
})
