import React, { useContext } from 'react';
import classnames from 'classnames';

import { SelectContext } from './Select';

export interface ISelectOptionProps {
  disabled?: boolean;
  title?: string;
  value?: string;
  className?: string;
  onSelect?: (currentValue: string) => void;
}

const SelectOption: React.FC<ISelectOptionProps> = function (props) {
  const { disabled, className, title, value, onSelect } = props;
  const context = useContext(SelectContext);

  const uniqValue = (): boolean => {
    if (typeof context.value === 'string') {
      return context.value === value;
    }

    // TODO 引用类型没判断
    return false;
  };

  const classNames = classnames('select-option', className, {
    disabled: disabled,
    active: uniqValue(),
  });

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (disabled) return false;
    context.onSelect && value && context.onSelect(value);
  };

  return (
    <li className={classNames} onClick={handleClick}>
      {title}
    </li>
  );
};
SelectOption.defaultProps = {
  disabled: false,
};

SelectOption.displayName = 'SelectOption';
export default SelectOption;
