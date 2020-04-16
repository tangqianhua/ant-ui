import React, { useState } from 'react';
import classnames from 'classnames';

type AlterTypes = 'success' | 'default' | 'warning' | 'error';

interface AlertProps {
  type?: AlterTypes;
  closable?: boolean;
  closeText?: React.ReactNode;
  message: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

function noop() {}

const Alert: React.FC<AlertProps> = (props) => {
  const [closing, setClosing] = useState(false);

  const { type, className, closeText, message, description, onClose } = props;
  let { closable } = props;

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setClosing(true);
    (onClose || noop)(event);
  };

  const classNames = classnames('alert', className, {
    [`alert-${type}`]: type,
    'alert-close': closing,
  });

  if (closeText) {
    closable = true;
  }

  const closeIcon = closable ? (
    <span data-testid="close" className="close-content" onClick={handleClose}>
      {closeText ? (
        <span data-testid="closeText">{closeText}</span>
      ) : (
        <i data-testid="iconfont" className="iconfont iconshanchu"></i>
      )}
    </span>
  ) : null;

  return closing ? null : (
    <div className={classNames}>
      <div className="msg-width-des">
        <div className="message">{message}</div>
        <div className="description">{description}</div>
      </div>
      {closeIcon}
    </div>
  );
};

Alert.defaultProps = {
  type: 'default',
};

export default Alert;
