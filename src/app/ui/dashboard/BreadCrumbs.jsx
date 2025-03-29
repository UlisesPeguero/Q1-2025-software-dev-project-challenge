'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function BreadCrumbs() {
  const pathname = usePathname();
  const [locations, setLocations] = useState([]);
  const [path, setPath] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    //TODO: Find a better approach to removing /dashboard
    let crumbs = pathname.substring(1).split('/');
    let _locations = [];
    let _path = '/' + crumbs[0] + '/';
    for (let i = 1; i < crumbs.length; i++) {
      _path += crumbs[i] + '/';
      _locations.push({
        name: crumbs[i].toUpperCase(),
        path: _path,
      });
    }
    setLocations((locations) => [..._locations].splice(1));
    setPath((path) => _locations[0]?.path);
    setName((name) => _locations[0]?.name.toUpperCase() || 'HOME');
  }, [pathname]);

  return (
    <div className='module-breadcrumbs py-0 px-4'>
      <ol className='breadcrumb'>
        <li className='breadcrumb-item'>
          {locations.length > 0 ? (
            <Link className='link-primary' href={path}>
              {name}
            </Link>
          ) : (
            name
          )}
        </li>
        {locations.map((location) => (
          <li key={location.path} className='breadcrumb-item active'>
            {location.name}
          </li>
        ))}
      </ol>
    </div>
  );
}
