Tags = React.createClass({

    switchTag(e) {
        var tagName = $(e.target).attr('name')
        var itemId = this.props.menuitemId
        Meteor.call('menuitemTemplate--switchTag', itemId, tagName)
    },

    render() {
        var allTags = Settings.menuitemTags
        var activeTags = this.props.activeTags
        var displayTags = []
        var onlyActive = this.props.onlyActive
        for (var i = 0; i < allTags.length; i++) {
            var tag = allTags[i]
            var active = _.findWhere(activeTags, tag)
            if (active || !onlyActive) {
                displayTags.push(<Tag key={i}
                    label={tag.label}
                    disabled={this.props.disabled}
                    active={active}
                    name={tag.name}
                    color={tag.color}
                    onClick={this.switchTag}/>)
            }
        }
        return(<div>{displayTags}</div>)
    }
})

// Settings.menuitemTags.map(function(tag, i){
//     var active = _.contains(activeTagNames, tag.name)
//     if (menuitem.inorder && (!tag.public || !active)) return
//     return <Tag key={i}
//         label={tag.label}
//         disabled={editDisabled}
//         active={active}
//         name={tag.name}
//         color={tag.color}
//         onClick={this.switchTag}/>
// }.bind(this))
