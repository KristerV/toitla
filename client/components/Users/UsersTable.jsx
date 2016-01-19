UsersTable = React.createClass({

    render() {
        return(<table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp max-width">
          <thead>
            <tr>
              <th className="mdl-data-table__cell--non-numeric">Nimi</th>
              <th>E-mail</th>
              <th>rating</th>
              <th>Vet</th>
              <th></th>
              <th></th>
              <th>Viimati online</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(function(user){
                return <UserListItem user={user}/>
            })}
          </tbody>
        </table>)
    }
})
