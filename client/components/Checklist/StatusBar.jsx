StatusBar = React.createClass({
    render() {
        var dotStyle = {
            display: "inline-block",
            width: "6px",
            height: "6px",
            borderRadius: "100%",
        }
        var containerStyle = {
            display: 'inline-block',
            border: "1px solid transparent",
        }
        return <div>
            {this.props.statuses.map(stat => {
                console.log(stat.text, stat.checked);
                var dotStyleClone = _.clone(dotStyle)
                if (stat.checked) {
                    switch (stat.text) {
                        case 'Ready for event':
                            dotStyleClone.backgroundColor = 'green'
                            break
                        case 'Done':
                            dotStyleClone.backgroundColor = 'green'
                            break
                        case 'Lost':
                            dotStyleClone.backgroundColor = 'red'
                            break
                        case 'Silent':
                            dotStyleClone.backgroundColor = 'red'
                            break
                        default:
                            dotStyleClone.backgroundColor = 'blue'
                    }
                } else {
                    dotStyleClone.backgroundColor = 'lightgrey'
                }

                var id = "stat-tooltip-" + stat._id + "-" + stat.text
                return <div key={stat._id} id={id} style={containerStyle}>
                    <div style={dotStyleClone}></div>
                    <div
                        className="mdl-tooltip"
                        htmlFor={id}
                        style={{whiteSpace: "normal"}}>
                        {stat.text}
                    </div>
                </div>
            })}
        </div>
    }
})
