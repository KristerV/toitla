var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/56e533621e82531d569423c6/default';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
})();

function tawkTimeout() {
    const user = Meteor.user()
    const name = user.getName()
    const email = user.getEmail()
    if (email && window.Tawk_API) {
        window.Tawk_API.setAttributes({
            name: name,
            email: email,
            'user-id': Meteor.userId()
        })
        // .visitor doesn't actually update server data, keeping it here maybe update will help
        window.Tawk_API.visitor = {
            name: name,
            email: email
        }
    } else {
        Meteor.setTimeout(tawkTimeout, 1000)
    }
}
tawkTimeout()