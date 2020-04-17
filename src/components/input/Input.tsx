import React, { ReactElement, InputHTMLAttributes } from 'react';
import classnames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  className?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, className, ...restProps } = props;

  const classNames = classnames('input-wrapper', className, {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  });

  if ('value' in restProps) {
    delete restProps.defaultValue;
    if (restProps.value === undefined || restProps.value === null) {
      restProps.value = '';
    }
  }

  return (
    <div className={classNames}>
      {prepend && <div className="input-group-prepend">{prepend}</div>}
      <input disabled={disabled} type="text" className="input-inner" {...restProps} />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  );
};

export default Input;
