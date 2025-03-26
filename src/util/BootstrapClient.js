"use client"

import { useEffect } from 'react';

function BootstrapClient() {
  useEffect(() => {
    // Dynamically import Bootstrap JS only in the client-side
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}

export default BootstrapClient;