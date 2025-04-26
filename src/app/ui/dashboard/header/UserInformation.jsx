import { PersonCircle, BoxArrowRight } from 'react-bootstrap-icons';
import { logout } from '@/app/actions/auth/session';
import { getProfileInfo } from '@/lib/data/dashboard';

export default async function UserInformation(props) {
  const result = await getProfileInfo();
  const name = result.username;
  //TODO: Add profile pictures
  const profilePicture = null;

  return (
    <div className='d-flex align-items-center justify-content-end'>
      <span className='user-name mx-1 text-capitalize'>{name}</span>
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
          // style={{ '--bs-btn-color': 'var(--bs-light-color)' }}
          type='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'></button>
        <ul className='dropdown-menu position-fixed'>
          <li>
            <a className='dropdown-item' href='#' role='button' disabled>
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
