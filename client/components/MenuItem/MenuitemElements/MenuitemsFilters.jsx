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
        this.props.onChange(filters)
    },

    onChangeText(obj) {

        // Get old values
        var filters = this.state.filters

        if (!filters.weight) filters.weight = {}
        if (!filters.price) filters.price = {}

        if (obj.name === 'min-weight') {
            var nr = Number(obj.value)
            if (obj.value && nr) {
                filters.weight.$gte = nr
            } else {
                delete filters.weight.$gte
            }
        } else if (obj.name === 'max-weight') {
            var nr = Number(obj.value)
            if (obj.value && nr) {
                filters.weight.$lte = nr
            } else {
                delete filters.weight.$lte
            }
        } else if (obj.name === 'freetext') {
            if (obj.value) {
                filters.$or = [
                    {title: {$regex: ".*"+obj.value+".*", $options: 'i'}},
                    {ingredients: {$regex: ".*"+obj.value+".*", $options: 'i'}}
                ]
            } else {
                delete filters.$or
            }
        } else if (obj.name === 'min-price') {
            var nr = Number(obj.value)
            if (obj.value && nr) {
                filters.price.$gte = nr
            } else {
                delete filters.price.$gte
            }
        } else if (obj.name === 'max-price') {
            var nr = Number(obj.value)
            if (obj.value && nr) {
                filters.price.$lte = nr
            } else {
                delete filters.price.$lte
            }
        }

        if (_.isEmpty(filters.price)) delete filters.price
        if (_.isEmpty(filters.weight)) delete filters.weight

        // Save state
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

        return(<div className="padding margin paper mdl-grid">
            <div className="mdl-cell mdl-cell--2-col">
                <FilterDropdown
                    label="Any chef"
                    name="chefId"
                    menuItems={chefs}
                    onChange={this.onChangeDropdown}/>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
                <FilterText
                    label="Name / Ingredient"
                    name="freetext"
                    onChange={this.onChangeText}/>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
                <FilterDropdown
                    label="All tags"
                    name="tags"
                    menuItems={tags}
                    onChange={this.onChangeDropdown}/>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
                <FilterDropdown
                    label="Any food type"
                    name="foodType"
                    menuItems={foodTypes}
                    onChange={this.onChangeDropdown}/>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
                <FilterText
                    label="Min price"
                    name="min-price"
                    patternTemplate="float"
                    patternError="Only enter a number"
                    onChange={this.onChangeText}/>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
                <FilterText
                    label="Max price"
                    name="max-price"
                    patternTemplate="float"
                    patternError="Only enter a number"
                    onChange={this.onChangeText}/>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
                <FilterText
                    name="min-weight"
                    label="Min weight"
                    patternTemplate="float"
                    patternError="Only enter a number"
                    onChange={this.onChangeText}/>
            </div>
            <div className="mdl-cell mdl-cell--2-col">
                <FilterText
                    name="max-weight"
                    label="Max weight"
                    patternTemplate="float"
                    patternError="Only enter a number"
                    onChange={this.onChangeText}/>
            </div>
        </div>)
    }
})
