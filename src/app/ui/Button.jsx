import { Icon } from './Icon';

function ButtonContent({ icon, iconSize, text, busy, spinnerClass }) {
  return (
    <>
      {icon && !busy && <Icon iconName={icon} size={iconSize || 20} />}
      {busy && <span className={spinnerClass}></span>}
      {text && (
        <span className={'d-none d-sm-inline' + (icon ? ' ms-1' : '')}>
          {text}
        </span>
      )}
    </>
  );
}

export default function Button({
  id,
  text,
  icon,
  iconSize,
  style,
  children,
  type = 'button',
  onClick,
  classes = 'btn-primary',
  size = '',
  busy = false,
  spinnerClass = 'spinner-border spinner-border-sm',
  tooltip,
  disabled,
  ...rest
}) {
  // TODO: Testing styles
  if (typeof style === 'undefined')
    style = {
      outline: 'none',
      borderWidth: '0',
      //borderRadius: '2px',
      boxShadow: '0 1px 4px rgba(0, 0, 0, .6)',
    };
  return (
    <button
      id={id || 'btn' + (text ? text.replace(' ', '') : icon)}
      style={style}
      className={`btn ${classes.length > 0 ? classes : ''} ${
        size.length > 0 ? 'btn-' + size : ''
      }`}
      type={type}
      onClick={onClick}
      title={tooltip}
      disabled={disabled || busy}
      {...rest}>
      {text || icon ? (
        <ButtonContent {...{ icon, iconSize, text, busy, spinnerClass }} />
      ) : (
        children
      )}
    </button>
  );
}
