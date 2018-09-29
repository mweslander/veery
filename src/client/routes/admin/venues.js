// Imports
import React from 'react';
import {
  IndexRedirect,
  Route
} from 'react-router';

// Components
import EventsDeletionModal from '../../components/AdminPanel/Events/DeletionModal';

import VenuesDeletionModal from '../../components/AdminPanel/Venues/DeletionModal';
import VenuesEdit from '../../components/AdminPanel/Venues/Edit';
import VenuesNew from '../../components/AdminPanel/Venues/New';
import VenuesShow from '../../components/AdminPanel/Venues/Show';
import VenuesShowAll from '../../components/AdminPanel/Venues/ShowAll';

function adminVenueRoutes({ requireSignIn }) {
  return (
    <Route path="venues" onEnter={requireSignIn}>
      <IndexRedirect to="all" />
      <Route path="all" component={VenuesShowAll}>
        <Route path=":id/delete" component={VenuesDeletionModal} />
      </Route>
      <Route path="new" component={VenuesNew} />
      <Route path=":id/edit" component={VenuesEdit} />
      <Route path=":id" component={VenuesShow}>
        <Route path="events/:eventId/delete" component={EventsDeletionModal} />
      </Route>
    </Route>
  )
}

export default adminVenueRoutes;
