'use client';

import { PersonCircle, BoxArrowRight } from 'react-bootstrap-icons';

export default function UserInformation(props) {
  const { name, profilePicture } = props.user || { name: 'Place Holder', profilePicture: null };
  return (
    <div className='d-flex align-items-center justify-content-end'>
      <span className='user-name mx-1'>{name}</span>
      <span className='d-none d-sm-inline-block mx-2 dropdown'>
        {
          profilePicture ?
            <img src={profilePicture} alt="User's profile avatar" className='user-profile-picture img-thumbnail' />
            :
            <PersonCircle size={48} />
        }
        <button className='btn dropdown-toggle dropdown-toggle-split' type='button' data-bs-toggle='dropdown' aria-expanded='false'></button>
        <ul className="dropdown-menu position-fixed">
          <li><a className='dropdown-item' onClick={() => navigate('./auth/login')} role='button'>Login</a></li>
          <li><a className="dropdown-item" href='#' role='button'>Profile</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href='#' role='button'>
            Sign out
            <BoxArrowRight size={28} className='float-end' />
          </a></li>
        </ul>

      </span>
    </div>
  );
}
