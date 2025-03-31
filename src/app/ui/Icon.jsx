import * as icons from 'react-bootstrap-icons';

// dinamyc icon
// code from https://www.npmjs.com/package/react-bootstrap-icons

export const Icon = ({ iconName, ...props }) => {
  const BootstrapIcon = icons[iconName];
  return <BootstrapIcon {...props} />;
};
