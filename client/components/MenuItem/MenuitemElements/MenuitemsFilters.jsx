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

    onChange(obj) {
        var filters = this.state.filters
        if (obj.name === 'tags') {
            var tagNames = _.pluck(obj.results, 'value')
            var f = []
            for (var i = 0; i < tagNames.length; i++) {
                f.push({'tags.name': tagNames[i]})
            }
            if (f.length > 0) {
                filters.$and = f
            } else {
                delete filters.$and
            }
        } else if (obj.inputType === 'dropdown') {
            var values = _.pluck(obj.results, 'value')
            if (values.length > 0) {
                filters[obj.name] = {$in: values}
            } else {
                delete filters[obj.name]
            }
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
                name="chefId"
                menuItems={chefs}
                autoWidth={true}
                onChange={this.onChange}/>
            <FilterText
                name="description"
                onChange={this.onChange}/>
            <FilterText
                name="ingredients"
                onChange={this.onChange}/>
            <FilterDropdown
                autoWidth={true}
                name="tags"
                menuItems={tags}
                onChange={this.onChange}/>
            <FilterDropdown
                autoWidth={true}
                name="foodType"
                menuItems={foodTypes}
                onChange={this.onChange}/>
            <FilterDropdown
                autoWidth={true}
                name="priceClass"
                menuItems={priceClasses}
                onChange={this.onChange}/>
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
