StatusBar = React.createClass({
    render() {
        var dotStyle = {
            display: "inline-block",
            width: "6px",
            height: "6px",
            borderRadius: "100%",
            verticalAlign: "middle",
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
                    dotStyleClone.backgroundColor = 'blue'
                } else {
                    dotStyleClone.backgroundColor = 'lightgrey'
                }
                if (stat.text === 'Ready for event') {
                    dotStyleClone.width = "10px"
                    dotStyleClone.height = "10px"
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
