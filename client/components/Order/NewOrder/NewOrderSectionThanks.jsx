NewOrderSectionThanks = React.createClass({

    goHome() {
        FlowRouter.go('/')
    },

    render() {
        return(<NewOrderSection
            bottomContent={<NewOrderSectionText dangerouslySetInnerHTML={T_deprecated("order", "thanks_form", true)}/>}
            bottomButtons={<NewOrderButtons label={T.global.back_home()} onClick={this.goHome} />}
        />)
    }
})
