import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SingIn from '../pages/SignIn';
import SingUp from '../pages/SingUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import MeetupCreate from '../pages/Meetup/meetupCreate';
import MeetupEdit from '../pages/Meetup/meetupEdit';
import MeetupDetails from '../pages/Meetup/meetupDetails';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />
      <Route path="/register" component={SingUp} />

      <Route path="/dashboard" component={Dashboard} isPrivite />
      <Route path="/profile" component={Profile} isPrivite />
      <Route path="/meetup" exact component={MeetupCreate} isPrivite />
      <Route path="/meetup/:id" exact component={MeetupDetails} isPrivite />
      <Route path="/meetup/:id/edit" component={MeetupEdit} isPrivite />
    </Switch>
  );
}
