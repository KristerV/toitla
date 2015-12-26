MenuitemsFilters = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        var subscription = Meteor.subscribe("allUserData")
        var users = Meteor.users.find({profile: {$exists: 1}}).fetch()
        return {
            subsReady: subscription.ready(),
            users: users,
        }
    },

    getInitialState() {
        return {filters: {}}
    },

    onChangeDropdown(obj) {

        // Get old values
        var filters = this.state.filters

        // Get new values
        var values = _.pluck(obj.results, 'value')
        var and = []

        // Tags need special treatement (and condition)
        if (obj.name === 'tags') {
            for (var i = 0; i < values.length; i++) {
                and.push({'tags.name': values[i]})
            }
            values = []
        }

        // Add 'and' conditions to filters
        if (and.length > 0) {
            filters.$and = and
        } else {
            delete filters.$and
        }

        // Add normal condition values to filters
        if (values.length > 0) {
            filters[obj.name] = {$in: values}
        } else {
            delete filters[obj.name]
        }

        this.setState({filters: filters})
        this.props.onChange(filters)
    },

    render() {
        var chefs = _.map(this.data.users, function(user){
            if (user.profile) {
                var label = user.eligible ? "" : " X "
                label += user.profile.name
                return {text: label, value: user._id}
            }
        })

        var tags = _.map(Settings.menuitemTags, function(tag){
            return {text: tag.label, value: tag.name}
        })

        var foodTypes = _.map(Settings.foodTypes, function(type){
            return {text: type, value: type}
        })

        var priceClasses = _.map(Settings.priceClasses, function(value, key, list){
            return {text: value, value: key}
        })

        return(<div className="padding margin paper">
            <FilterDropdown
                label="Any chef"
                name="chefId"
                menuItems={chefs}
                autoWidth={true}
                onChange={this.onChangeDropdown}/>
            <FilterText
                name="description"
                onChange={this.onChange}/>
            <FilterText
                name="ingredients"
                onChange={this.onChange}/>
            <FilterDropdown
                label="All tags"
                autoWidth={true}
                name="tags"
                menuItems={tags}
                onChange={this.onChangeDropdown}/>
            <FilterDropdown
                label="Any food type"
                autoWidth={true}
                name="foodType"
                menuItems={foodTypes}
                onChange={this.onChangeDropdown}/>
            <FilterDropdown
                label="Any price"
                autoWidth={true}
                name="priceClass"
                menuItems={priceClasses}
                onChange={this.onChangeDropdown}/>
            <FilterText
                name="ingredients"
                onChange={this.onChange}/>
            <FilterText
                name="weight-from"
                onChange={this.onChange}/>
            <FilterText
                name="weight-to"
                onChange={this.onChange}/>
        </div>)
    }
})
