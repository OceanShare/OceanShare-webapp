import React from 'react';
import { DropdownItem } from 'reactstrap';
import { withFirebase } from '../Firebase';
import i18next from 'i18next';

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
    {i18next.t('Log out')}
  </DropdownItem>
);

export default withFirebase(SignOutButton);
