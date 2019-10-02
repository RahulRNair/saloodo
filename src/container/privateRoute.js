import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { checksession } from '../utils/session';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={props => (
    checksession() !== null ? (
      <Component { ...props } />
    ) : (
      <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}
      />
    )
  )} />
);

export default PrivateRoute;
