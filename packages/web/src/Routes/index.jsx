import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import {
  User,
  Detail,
  Materiel,
  PageNotFound,
  Technicien,
  Auth,
  UsersList,
  MaterielsList,
  Techniciens
} from '../Pages'
import { PublicRoute, PrivateRoute } from './protected/ProtectedRoute'

function Routes() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact component={Materiel} />
        <PrivateRoute path="/detail" component={Detail} />
        <PrivateRoute path="/user" component={User} />
        <PrivateRoute path="/technicien" component={Technicien} />
        <PrivateRoute path="/listuser" component={UsersList} />
        <PrivateRoute path="/listmateriel" component={MaterielsList} />
        <PrivateRoute path="/listtechnicien" component={Techniciens} />
        <PublicRoute path="/auth" component={Auth} />
        <Route path="/oops" component={PageNotFound} />
        <Redirect to="/oops" />
      </Switch>
    </Router>
  )
}

export default Routes
