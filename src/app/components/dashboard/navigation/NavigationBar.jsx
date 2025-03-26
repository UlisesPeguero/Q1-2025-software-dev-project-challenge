'use client'; 

import styles from './NavigationBar.module.css';
import React from 'react';
import NavigationItem from './NavigationItem';

export default function NavigationBar({ modules, activeModule, handleActiveModule }) {
  const handleActive = module => {
    handleActiveModule(module);
  };
  return (
    <nav className={"navigation-sidebar d-flex flex-column fleshrink-0 shadow-sm mb-auto"}>
      <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
        <div className='navigation-spacer w-100'></div>
        {
          modules.map(module =>
            <NavigationItem key={module.id} module={module} setActive={handleActive} isActive={activeModule === module} />
          )
        }
      </ul>
    </nav>
  );
}
