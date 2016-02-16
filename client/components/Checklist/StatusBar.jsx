StatusBar = React.createClass({
    render() {
        var statuses = this.props.statuses
        var result = this.props.result ? this.props.result.result : {}
        var doubleSize = 1.8
        var id = Random.id()

        switch (result) {
            case 'done':
                resultDot = this.getDot({_id: id, text: 'Done', checked: true}, 'green', doubleSize)
                break
            case 'lost':
                resultDot = this.getDot({_id: id, text: 'Lost', checked: true}, 'red', doubleSize)
                break
            case 'silent':
                resultDot = this.getDot({_id: id, text: 'Silent', checked: true}, 'red', doubleSize)
                break
            default:
                resultDot = this.getDot({_id: id, text: 'Not finished yet'}, null, doubleSize)
        }

        return <div>
            {statuses.map(stat => {
                var size = 1
                if (stat.checked) {
                    var color = 'rgb(63, 81, 181)'
                }
                if (stat.text === 'Ready for event') {
                    size = doubleSize
                }
                return this.getDot(stat, color, size)
            })}
            {resultDot}
        </div>
    },

    getDot(stat, color, size) {
        var id = "stat-tooltip-" + stat._id + "-" + stat.text
        size = size || 1
        color = color || 'rgba(0,0,0,0.2)'
        var dotStyle = {
            display: "inline-block",
            width: (6 * size) + "px",
            height: (6 * size) + "px",
            borderRadius: "100%",
            verticalAlign: "middle",
            backgroundColor: color
        }
        var containerStyle = {
            display: 'inline-block',
            border: "1px solid transparent",
        }
        return <div key={stat._id} id={id} style={containerStyle}>
            <div style={dotStyle}></div>
            <div
                className="mdl-tooltip"
                htmlFor={id}
                style={{whiteSpace: "normal"}}>
                {stat.text}
            </div>
        </div>
    }
})
