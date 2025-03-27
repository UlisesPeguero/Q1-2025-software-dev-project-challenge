import React from 'react';
import { Icon } from '../../ui/Icon';
import { useRouter } from 'next/navigation';

export default function NavigationItem(props) {
  const router = useRouter();

  const { id, name, path, icon } = props.module;
  const handleClick = () => {
    router.push(props.basePath + path);
    props.setActive(props.module);
  };
  const ModuleIcon = () => <Icon iconName={icon} className='my-2' />;
  return (
    <li className={`nav-item ${props.isActive ? 'active-module' : ''}`}>
      {props.isActive ? (
        <ModuleIcon />
      ) : (
        <button
          className='nav-link py-1 px-3 border-bottom rounded-0'
          onClick={handleClick}
          title={name}>
          <ModuleIcon />
        </button>
      )}
    </li>
  );
}
