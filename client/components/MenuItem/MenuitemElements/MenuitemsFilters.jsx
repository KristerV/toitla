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

        // Add filter with proper condition
        if (obj.name === 'tags') {
            if (values.length > 0) {
                filters['tags.name'] = {$all: values}
            } else {
                delete filters['tags.name']
            }
        } else {
            if (values.length > 0) {
                filters[obj.name] = {$in: values}
            } else {
                delete filters[obj.name]
            }
        }

        // Save state
        this.setState({filters: filters})

        // Format filters into 'and' conditions
        var and = []
        for (var key in filters) {
            and.push({[key]: filters[key]})
        }

        // React UI to changes
        if (and.length > 0) {
            this.props.onChange({$and: and})
        } else {
            this.props.onChange({})
        }
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
