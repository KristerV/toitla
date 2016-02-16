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
                if (stat.checked) {
                    switch (stat.text) {
                        case 'Ready for event':
                            dotStyle.backgroundColor = 'green'
                            break
                        case 'Done':
                            dotStyle.backgroundColor = 'green'
                            break
                        case 'Lost':
                            dotStyle.backgroundColor = 'red'
                            break
                        case 'Silent':
                            dotStyle.backgroundColor = 'red'
                            break
                        default:
                            dotStyle.backgroundColor = 'blue'
                    }
                } else {
                    dotStyle.backgroundColor = 'lightgrey'
                }

                var id = "stat-tooltip-" + stat._id + "-" + stat.text
                return <div key={stat._id} id={id} style={containerStyle}>
                    <div style={dotStyle}></div>
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
