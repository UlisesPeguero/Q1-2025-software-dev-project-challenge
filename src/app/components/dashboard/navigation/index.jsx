'use client';

import NavigationBar from './NavigationBar';
import { useState } from 'react';

export default function Navigation({ modules, activeModule: _activeModule }) {
  const [activeModule, setActiveModule] = useState(_activeModule);

  const handleActiveModule = (module) => {
    setActiveModule(module);
  };

  return (
    <NavigationBar
      modules={modules}
      activeModule={activeModule}
      handleActiveModule={handleActiveModule}
    />
  );
}
