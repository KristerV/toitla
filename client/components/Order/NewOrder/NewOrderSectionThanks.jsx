NewOrderSectionThanks = React.createClass({

    goHome() {
        FlowRouter.go('/')
    },

    render() {
        return(<NewOrderSection
            bottomContent={<NewOrderSectionText dangerouslySetInnerHTML={T.order.neworder.submitted.thanks({dangerous: true})}/>}
            bottomButtons={<NewOrderButtons label={T.order.neworder.submitted.button()} onClick={this.goHome} />}
        />)
    }
})
