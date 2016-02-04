Meteor.methods({
    discourseSSO:function(userId, payload, sig){
        discourse_sso = Npm.require('discourse-sso');

        if (!userId)
            throw new Meteor.Error(401, "Not logged in. Please log into Toitla before going to the forum.")
        if (!payload || !sig)
            throw new Meteor.Error(401, "Forum sent data incorrect: "+payload+" - "+sig)

        check(userId, String);
        check(payload, String);
        check(sig, String);

        var user = Meteor.users.findOne(userId)
        var sso = new discourse_sso(process.env.DISCOURSE_SSO_SECRET);

        if (!sso.validate(payload, sig))
            throw new Meteor.Error(401, "Payload and Sig do not match")

        var userparams = {
            // Required, will throw exception otherwise
            "nonce": sso.getNonce(payload),
            "external_id": user._id,
            "email": user.getEmail(),
            "username": user.profile.name.replace(/[^a-z0-9]+/gi, "_"),
            "name": user.profile.name
        }

        return sso.buildLoginString(userparams);

    }
});
