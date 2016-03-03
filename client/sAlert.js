Meteor.startup(function () {
    sAlert.config({
        effect: 'bouncyflip',
        position: 'bottom-right',
        timeout: 8000,
        html: false,
        onRouteClose: true,
        stack: true,
        offset: 0
    });
});

Meteor.startup(function(){
     if (Meteor.isDev) {
        $('#development-notification').css('display', 'block')
        $('body').css('background-image', 'none').css('background-color', 'DarkSlateGrey')
     }
});
