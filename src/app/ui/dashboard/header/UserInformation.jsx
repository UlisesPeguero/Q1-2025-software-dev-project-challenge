'use client';

import { PersonCircle, BoxArrowRight } from 'react-bootstrap-icons';
import { logout } from '@/app/actions/auth/session';

export default function UserInformation(props) {
  const { name, profilePicture } = props.user || {
    name: 'Place Holder',
    profilePicture: null,
  };
  return (
    <div className='d-flex align-items-center justify-content-end'>
      <span className='user-name mx-1'>{name}</span>
      <span className='d-none d-sm-inline-block mx-2 dropdown'>
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="User's profile avatar"
            className='user-profile-picture img-thumbnail'
          />
        ) : (
          <PersonCircle size={48} />
        )}
        <button
          className='btn dropdown-toggle dropdown-toggle-split'
          type='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'></button>
        <ul className='dropdown-menu position-fixed'>
          <li>
            <a className='dropdown-item' href='#' role='button'>
              Profile
            </a>
          </li>
          <li>
            <hr className='dropdown-divider' />
          </li>
          <li>
            <button
              className='dropdown-item'
              type='submit'
              role='button'
              form='logoutForm'>
              Sign out
              <BoxArrowRight size={28} className='float-end' />
            </button>
          </li>
        </ul>
      </span>
      <form id='logoutForm' action={logout}></form>
    </div>
  );
}
