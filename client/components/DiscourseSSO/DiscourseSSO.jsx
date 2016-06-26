import React from 'react';
DiscourseSSO = React.createClass({

    render() {
        var result = this.props.result
        var err = this.props.error

        if (err)
            return <h3 className="text-white">{err.reason}</h3>

        if (!result)
            return <h3 className="text-white">Uhh, unknown error</h3>

        return <h3 className="text-white">Not sure what went wrong.</h3>
    }

})
