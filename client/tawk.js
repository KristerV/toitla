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
        console.log("SET STUFF")
        window.Tawk_API.setAttributes({name: name})
        window.Tawk_API.setAttributes({email1: email}) // just email doesn't work
        window.Tawk_API.setAttributes({'user-id': Meteor.userId()})
    } else {
        Meteor.setTimeout(tawkTimeout, 1000)
    }
}
tawkTimeout()