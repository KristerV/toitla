Overview = React.createClass({

    render() {
        return (<h4 style={{color: "white"}}>Tellimusi siia veel ei tule (moodul arendamisel). Seniks võid oma menüü ja profiili ära täita, sest täidame tellimusi käsitsi!</h4>)
        var phases = this.state.phases
        var ListPhases = []
        for (var i = 0; i < phases.length; i++) {
            ListPhases.push(<ListPhase key={phases[i]} phase={phases[i]}/>)
        }
        return(<div>{ListPhases}</div>)
    }
})
