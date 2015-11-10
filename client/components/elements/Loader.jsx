Loader = React.createClass({
    render(){
        var show = !this.props.ifNot
        if (show)
            return(<div className="mdl-spinner mdl-js-spinner is-active"></div>)
        else
            return(<div></div>)
    }
})
