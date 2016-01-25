Stats = React.createClass({

    componentDidMount() {
        var orders = this.props.orders
        var data = {}

        var startDate = moment(orders[0].event.fromDate)
        var endDate = moment(orders[orders.length-1].event.fromDate)

        while(startDate.diff(endDate, 'days') <= 0) {
            var dateString = startDate.format('DD.MM.YY')
            data[dateString] = {date: startDate.clone().toDate(), orderCount: 0}
            startDate.add(1, 'day')
        }

        orders.forEach(order => {
            var dateString = moment(order.event.fromDate).format('DD.MM.YY')
            data[dateString].orderCount++
        })

        var json = _.values(data)

        this.chat = c3.generate({
            bindto: '#burndown',
            data: {
                x: 'x',
                json: json,
                type: 'bar',
                keys: {
                    x: 'date',
                    value: ['orderCount']
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
            <p className="text-hint">This graph does not update data automatically</p>
            <div id="burndown"></div>
        </div>)
    }

})
