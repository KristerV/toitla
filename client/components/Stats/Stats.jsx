Stats = React.createClass({

    componentDidMount() {
        var orders = this.props.orders
        var data = {}

        // Generate empty dates so chart is evenly distributed
        var startDate = moment(orders[0].event.fromDate)
        var endDate = moment(orders[orders.length-1].event.fromDate)
        while(startDate.diff(endDate, 'days') <= 0) {
            var dateString = startDate.format('DD.MM.YY')
            data[dateString] = {date: startDate.clone().toDate(), orderCount: 0}
            startDate.add(1, 'day')
        }

        // Fill data into empty objects
        orders.forEach(order => {
            var dateString = moment(order.event.fromDate).format('DD.MM.YY')
            data[dateString].orderCount++
        })

        // Convert object to array
        var json = _.values(data)

        // Find weekly average
        var week = []
        for (var i = 0; i < json.length; i++) {
            week.push(json[i].orderCount)
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
                    value: ['orderCount', 'weekAverage']
                },
                types: {
                    weekAverage: 'spline'
                },
                names: {
                    orderCount: 'Order count',
                    weekAverage: '3 a week burndown'
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

        return(<div className="paper margin-top max-width padding">
            <p className="text-hint">Refresh to update data</p>
            <div id="burndown"></div>
        </div>)
    }

})
