import React from 'react';
import { DropdownItem } from 'reactstrap';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <DropdownItem
    style={{ cursor: 'pointer' }}
    onClick={firebase.doSignOut}
  >
    <i
      style={{ color: '#f5365c', cursor: 'pointer' }}
      className={'tim-icons icon-button-power'}
      color="danger"
    />{' '}
    Log out
  </DropdownItem>
);

export default withFirebase(SignOutButton);
