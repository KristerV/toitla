import React from 'react';
UserProfile = React.createClass({

    logout(e) {
        Meteor.logout(function () {
            FlowRouter.go('/')
        });
    },

    changeEmail(e) {
        this.props.user.changeEmail(e.target.value)
    },

    changeCommissionFee(e) {
        this.props.user.changeCommissionFee(e.target.value)
    },

    newLocation() {
        Meteor.call('User--newLocation', this.props.user._id)
    },

    updateLocationField(e) {
        var name = e.target.name
        var value = e.target.value
        var id = $(e.target).parents('[data-location-id]').attr('data-location-id')
        Meteor.call('User--updateLocation', this.props.user._id, id, name, value)
    },

    removeLocation(e) {
        if (confirm("Remove address for sure?")) {
            var id = $(e.target).parents('[data-location-id]').attr('data-location-id')
            Meteor.call('User--removeLocation', this.props.user._id, id)
        }
    },

    uploadComplete(path, filename) {
        Meteor.call('User--updateProfileImage', this.props.user._id, path, filename)
    },

    render() {
        let isManager = Roles.userIsInRole(Meteor.userId(), 'manager');
        if (!isManager && this.props.user._id !== Meteor.userId()) {
            return <div>Not allowed</div>;
        }
        let user = this.props.user || {};
        let profile = user.profile || {};

        return (
            <div className="mdl-grid">
                <div className="paper padding mdl-cell mdl-cell--4-col">
                    <ProfileImage user={user}/>
                    <FileUpload path="uploads/images/profile" onComplete={this.uploadComplete}/>
                    <p className="text-hint">Pilt lõigatakse näo suuruseks automaatselt - võid laadida ükskõik kui suure pildi.</p>
                </div>
                <div className="paper padding mdl-cell mdl-cell--4-col">
                    <TextInput
                        label="Email"
                        onBlur={this.changeEmail}
                        value={user.getEmail()}
                        disabled={!isManager}
                    />
                    <TextInput
                        label="Name"
                        onBlur={user.handleTextFieldChange.bind(user)}
                        name="profile.name"
                        value={profile.name}
                    />
                    <TextInput
                        label="Telefoni number"
                        onBlur={user.handleTextFieldChange.bind(user)}
                        name="profile.tel"
                        value={profile.tel}/>
                    <TextInput
                        label="Koduleht"
                        onBlur={user.handleTextFieldChange.bind(user)}
                        name="profile.homepage"
                        value={profile.homepage}/>
                    <TextInput
                        label="Vahendustasu määr (%)"
                        onBlur={this.changeCommissionFee}
                        value={user.commissionFee}
                        disabled={!isManager}
                        patternTemplate="float"
                        patternError="Palun sisesta üks arv"/>
                </div>
                <div className="paper padding mdl-cell mdl-cell--4-col">
                    <TextInput
                        label="Ettevõtte nimi"
                        onBlur={user.handleTextFieldChange.bind(user)}
                        name="profile.companyName"
                        value={profile.companyName}/>
                    <TextInput
                        label="Ettevõtte registrikood"
                        onBlur={user.handleTextFieldChange.bind(user)}
                        name="profile.companyCode"
                        value={profile.companyCode}/>
                    <Checkbox
                        label="Olen teavitanud Veterinaar- ja Toiduametit oma koduköögist."
                        onChange={user.handleCheckboxChange.bind(user)}
                        name="profile.vet"
                        defaultChecked={profile.vet}/>
                    <br/>
                    <sub>Ilma ettevõtte või Vet-ametiga kooskõlastamiseta me kahjuks koostööd teha ei saa. Need
                        protsessid ei ole aga üldse keerulised. Õpetuse kallal veel nokitseme, aga võta ühendust
                        kati@toitla.com ja me juhendame su mõnusalt läbi.</sub>
                </div>
                {_.map(profile.locations, (loc, i) => {
                    i++
                    return <div className="paper padding mdl-cell mdl-cell--4-col" key={loc._id}
                                data-location-id={loc._id}>
                        <TextInput
                            label="Aadress"
                            name="address"
                            onBlur={this.updateLocationField}
                            value={loc.address}
                        />
                        {isManager ?
                            <TextInput
                                label="Koordinaadid (google mapsist saab)"
                                name="latlong"
                                onBlur={this.updateLocationField}
                                value={loc.latlong}
                            />
                            : null
                        }
                        <TextInput
                            label="Juhised autojuhile"
                            name="notes"
                            onBlur={this.updateLocationField}
                            value={loc.notes}
                            rows={1}
                        />
                        <button className="margin mdl-button mdl-js-button mdl-button--colored"
                                onClick={this.removeLocation}>Remove address
                        </button>
                    </div>
                })}
                <button className="margin mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
                        onClick={this.newLocation}>New address
                </button>
                {/*<TextInput
                 label="Aadress"
                 onBlur={user.handleTextFieldChange.bind(user)}
                 name="profile.address"
                 value={profile.address}/>
                 <TextInput
                 label="Waze link"
                 onBlur={user.handleTextFieldChange.bind(user)}
                 name="profile.waze"
                 value={profile.address}/>*/}
                <button className="margin mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        onClick={this.logout}>Log out
                </button>
                {Roles.userIsInRole(Meteor.userId(), 'manager') ?
                    <div className="mdl-cell--5-col">
                        <h3 className="text-white text-center">Chef On-Boarding</h3>
                        <div className="paper padding">
                            <Checklist collectionName="users" docId={user._id} datapath="chefOnBoarding"/>
                        </div>
                    </div>
                    : null}
            </div>)
    }
})
