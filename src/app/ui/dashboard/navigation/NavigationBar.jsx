'use client';

import { usePathname } from 'next/navigation';
import NavigationItem from './NavigationItem';
import { useEffect, useState } from 'react';

export default function NavigationBar({ modules }) {
  const [activeModule, setActiveModule] = useState();
  const pathname = usePathname();

  const handleActive = (module) => {
    setActiveModule(module);
  };

  useEffect(() => {
    handleActive(modules.findLast((m) => pathname.startsWith(m.path)));
  }, [pathname]);

  return (
    <nav
      className={
        'navigation-sidebar d-flex flex-column fleshrink-0 shadow-sm mb-auto'
      }>
      <ul className='nav nav-pills nav-flush flex-column mb-auto text-center'>
        <div className='navigation-spacer w-100'></div>
        {modules.map((module) => (
          <NavigationItem
            key={module.id}
            module={module}
            setActive={handleActive}
            isActive={activeModule === module}
          />
        ))}
      </ul>
    </nav>
  );
}
