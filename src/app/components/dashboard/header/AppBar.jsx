import AppBarTitle from './AppBarTitle';
import UserInformation from './UserInformation';
import { Icon } from '../../ui/Icon';

export default function AppBar(props) {
  return (
    <header className='app-header border-bottom shadow-sm'>
      <div
        className='container-fluid d-grid gap-3 alignt-items-center px-2 px-md-3'
        style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className='d-flex align-items-center app-header-title'>
          <Icon
            iconName='CashStack'
            size={36}
            color='#7579eb'
            className='app-logo'
          />
          <AppBarTitle appTitle={props.appTitle} />
        </div>
        <UserInformation user={{ name: 'Place Holder', profilePicture: '' }} />
      </div>
    </header>
  );
}
