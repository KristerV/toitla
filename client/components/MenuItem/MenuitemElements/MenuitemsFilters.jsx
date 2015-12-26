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
        this.sendToParent(filters)
    },

    onChangeText(obj) {

        // Get old values
        var filters = this.state.filters

        if (obj.name === 'min-weight') {
            var nr = Number(obj.value)
            if (obj.value && nr) {
                filters.weight = {$gt: nr}
            } else {
                delete filters.weight
            }
        } else if (obj.name === 'freetext') {
            if (obj.value) {
                filters.$or = [
                    {title: {$regex : ".*"+obj.value+".*"}},
                    {ingredients: {$regex : ".*"+obj.value+".*"}}
                ]
            } else {
                delete filters.$or
            }
        }

        // Save state
        this.setState({filters: filters})
        this.sendToParent(filters)
    },

    sendToParent(filters) {
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
                label="Name / Ingredient"
                name="freetext"
                onChange={this.onChangeText}/>
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
                name="min-weight"
                label="Min weight"
                pattern="[0-9]*"
                patternError="Only enter a number"
                onChange={this.onChangeText}/>
        </div>)
    }
})
