'use client';

import NavigationBar from './NavigationBar';
import { useEffect, useState } from 'react';

export default function Navigation({
  base,
  modules,
  activeModule: _activeModule,
}) {
  const [activeModule, setActiveModule] = useState();

  useEffect(() => {
    handleActiveModule(_activeModule);
  }, []);

  const handleActiveModule = (module) => {
    setActiveModule(module);
  };

  return (
    <NavigationBar
      basePath={base || '/'}
      modules={modules}
      activeModule={activeModule}
      handleActiveModule={handleActiveModule}
    />
  );
}
