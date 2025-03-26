'use client';

//import getCurrentPath from '../common/currentLocation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function BreadCrumbs() {
  const pathname = usePathname();
  const [locations, setLocations] = useState([]);
  const [path, setPath] = useState();
  const [name, setName] = useState();
  // const appLocation = useLocation();
  // const matches = useMatches();
  // const currentPath = getCurrentPath();

  useEffect(() => {
    let crumbs = pathname.substring(1).split('/');
    //TODO: Replace with extra locations from currentpath
    setLocations([]);
    setPath(pathname);
    setName(crumbs[0].toUpperCase() || 'HOME');
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
