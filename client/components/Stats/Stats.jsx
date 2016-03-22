Stats = React.createClass({

    componentDidMount() {
        var orders = this.props.orders
        var data = {}

        // Generate empty dates so chart is evenly distributed
        var startDate = moment(orders[0].event.fromDate)
        var endDate = moment(orders[orders.length-1].event.fromDate)
        while(startDate.diff(endDate, 'days') <= 0) {
            var dateString = startDate.format('DD.MM.YY')
            data[dateString] = {date: startDate.clone().toDate(), done: 0, inProgress: 0, lost: 0, total: 0}
            startDate.add(1, 'day')
        }

        // Fill data into empty objects
        orders.forEach(order => {
            var dateString = moment(order.event.fromDate).format('DD.MM.YY')
            if (order.result && order.result.result === 'lost')
                data[dateString].lost++
            else if (order.result && order.result.result === 'done') {
                data[dateString].done++
                data[dateString].total++
            } else {
                data[dateString].total++
                data[dateString].inProgress++
            }
        })

        // Convert object to array
        var json = _.values(data)

        // Find weekly average
        var week = []
        for (var i = 0; i < json.length; i++) {
            week.push(json[i].total)
            if (week.length > 7)
                week.shift()
            var sum = 0
            for (var j = 0; j < week.length; j++) {
                sum += week[j]
            }
            var average = sum / week.length
            json[i].weekAverage = 3 - average
        }
        json = json.splice(7)

        // Generate chart
        this.chat = c3.generate({
            bindto: '#burndown', // This is where the chart will be attached to
            data: {
                x: 'x',
                json: json,
                type: 'bar',
                keys: {
                    x: 'date',
                    value: ['inProgress', 'lost', 'done', 'weekAverage']
                },
                types: {
                    weekAverage: 'spline',
                    lost: 'step',
                },
                groups: [['done', 'inProgress']],
                names: {
                    done: 'Done',
                    inProgress: 'In Progress',
                    lost: 'Lost',
                    weekAverage: '3 orders a day (week average burndown)'
                },
                colors: {
                    done: '#00ff00',
                    inProgress: '#0000ff',
                    lost: '#ff0000',
                    weekAverage: '#000000',
                }
            },
            bar: {
                width: {
                    ratio: 0.8
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'
                    }
                },
                y: {
                    tick: {
                        values: [1, 2, 3, 4, 5],
                        orderCount: 5,
                    }
                }
            },
            grid: {
                x: {
                    lines: [{value: new Date(), text: 'today'}]
                }
            }
        })
    },

    render() {
        var monthAgo = moment().subtract(20, 'days').toDate()

        var analSessions = {}

        this.props.analytics.forEach(a => {
            if (!analSessions[a.sessionId])
                analSessions[a.sessionId] = []
            analSessions[a.sessionId].push(a)
        })

        var analRows = []
        _.each(analSessions, (anal, sessionId) => {
            var columns = []
            var username = ''
            var date = moment(anal[0].date).format('D.MM.YYYY')
            _.each(anal, a => {
                username = a.username || a.userId || a.guestId
                columns.push(<span key={Random.id()}><a href={a.url}>{a.event}</a> <span className="text-hint">&rang;</span> </span>)
            })
            analRows.push(<p key={sessionId}><span>{username} {date}</span> {columns}</p>)
        })
        analRows.reverse()

        return(<div className="max-width">
            <h3 className="text-white text-center">Burndown to 3 orders a day</h3>
            <div className="paper margin-top padding">
                <p className="text-hint">Refresh to update data</p>
                <div id="burndown"></div>
            </div>
            <h3 className="text-white text-center">User tracking</h3>
            <div className="paper margin-top margin-bottom padding">
                {analRows}
            </div>
        </div>)
    }

})
