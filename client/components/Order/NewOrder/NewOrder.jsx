import React from 'react';
NewOrder = React.createClass({

    goHome() {
        FlowRouter.go("/")
    },

    nextSection(e) {
        var currentIndex = $(e.target).parents('section').index() - 1;
        var nextIndex = currentIndex + 2;

        Meteor.call('NewOrderSections.nextSection', this.props.order._id, currentIndex, (err, result) => {
            if (err) {
                console.error(err);
            } else if (result) {
                var scrollTop = $("section:nth-of-type(" + nextIndex + ")").offset().top;
                $('html, body, .mdl-layout__content').animate({
                    scrollTop: scrollTop
                }, 500);
            }
        })
    },

    submitForm() {
        var order = this.props.order;
        var orderId = this.props.order._id;

        Meteor.call('NewOrderSections.validate', orderId, (err, result) => {
            if (result) {
                order.submitForm();
            }
        });
    },

    render() {
        var order = this.props.order;
        if (!order) return <p className="text-white">Form Submitted</p>;
        order.errors = order.errors || {};

        return(<div className="h100">
            <LandingNavbar/>
            <NewOrderSection
                leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T.order.neworder.contact({dangerous: true})}/>}
                rightContent={<OrderContactForm order={order}/>}
                rightButtons={<NewOrderButtons label={T.order.neworder.buttons.contact()} onClick={this.nextSection}/>}
            />
            <NewOrderSection
                leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T.order.neworder.event({dangerous: true})}/>}
                rightContent={<OrderEventForm order={order}/>}
                rightButtons={<NewOrderButtons label={T.order.neworder.buttons.event()} onClick={this.nextSection}/>}
            />
            <NewOrderSection
                leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T.order.neworder.extra({dangerous: true})}/>}
                rightContent={<OrderGeneralInputForm
                    order={order}
                    inputRows={1}
                    inputName="extraInfo"
                    inputValue={order.extraInfo}
                    inputErrorMsg={order.errors['extraInfo']}
                    buttons={<NewOrderButtons label={T.order.neworder.buttons.extra()} onClick={this.nextSection}/>}
                    />}
            />
            <NewOrderSection
                leftContent={<NewOrderSectionText dangerouslySetInnerHTML={T.order.neworder.payment({dangerous: true})}/>}
                rightContent={<OrderPaymentForm order={order}/>}
                rightButtons={<NewOrderButtons label={T.order.neworder.buttons.payment()} onClick={this.submitForm}/>}
            />
        </div>)
    }
});
