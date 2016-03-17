NewOrder = React.createClass({

    goHome() {
        FlowRouter.go("/")
    },

    nextSection(e) {
        var currentIndex = $(e.target).parents('section').index()
        var nextIndex = currentIndex + 2
        Meteor.call('NewOrderSections.nextSection', this.props.order._id, currentIndex, (err, result) => {
            if (err)
                console.error(err)
            else if (result) {
                var scrollTop = $("section:nth-of-type("+nextIndex+")").offset().top
                $('html, body, .mdl-layout__content').animate({
                    scrollTop: scrollTop
                }, 500);
            }
        })
    },

    submitForm() {
        this.props.order.submitForm()
    },

    render() {
        var order = this.props.order
        if (!order) return <p className="text-white">Form Submitted</p>
        order.errors = order.errors || {}

        return(<div className="h100">
            <NewOrderSection
                leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T_deprecated("order", "contact_form", true)}/>}
                rightContent={<OrderContactForm order={order}/>}
                rightButtons={<NewOrderButtons label="Next - event details" onClick={this.nextSection}/>}
            />
            <NewOrderSection
                leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T_deprecated("order", "event_form", true)}/>}
                rightContent={<OrderEventForm order={order}/>}
                rightButtons={<NewOrderButtons label="Next - allergies" onClick={this.nextSection}/>}
            />
            <NewOrderSection
                leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T_deprecated("order", "allergies_form", true)}/>}
                rightContent={<OrderAllergiesForm order={order}/>}
                rightButtons={<NewOrderButtons label="Next - extra info" onClick={this.nextSection}/>}
            />
            <NewOrderSection
                leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T_deprecated("order", "extra_form", true)}/>}
                rightContent={<OrderGeneralInputForm
                    order={order}
                    inputRows={1}
                    inputName="extraInfo"
                    inputLabel={T.order.extra_form_label()}
                    inputValue={order.extraInfo}
                    inputErrorMsg={order.errors['extraInfo']}
                    buttons={<NewOrderButtons label="finish" onClick={this.submitForm}/>}
                    />}
            />
        </div>)
    }
})
