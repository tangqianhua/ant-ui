import React, { createContext, useState, useRef, useEffect } from 'react';
import classnames from 'classnames';

import Input from '../input/Input';
import useClickOutside from '../../hooks/useClickOutside';

type SizeType = 'lg' | 'sm';
export interface ISelectProps {
  size?: SizeType;
  disabled?: boolean;
  multiple?: boolean;
  className?: string;
  value?: string;
  placeholder?: string;
  onSelect?: (currentValue: string) => void;
}

export const SelectContext = createContext<ISelectProps>({});

const Select: React.FC<ISelectProps> = (props) => {
  const { size, disabled, multiple, className, children, onSelect, value, ...restProps } = props;
  const [selectState, setSelectState] = useState({ showDropdown: false, inputValue: value });
  const componentRef = useRef<HTMLDivElement>(null);

  const classNames = classnames('select', className, {
    'select-lg': size === 'lg',
    'select-sm': size === 'sm',
  });

  const currentSelect = (selectValue: string) => {
    onSelect && onSelect(selectValue);
    setSelectState({ ...selectState, showDropdown: false, inputValue: selectValue });
  };

  const focus = () => {
    setSelectState({ ...selectState, showDropdown: true });
  };

  const blur = () => {
    // if(!value && restProps.placeholder) {
    //   value = restProps.placeholder
    // }
  };

  const changeInputValue = () => {};
  return (
    <SelectContext.Provider value={{ onSelect: currentSelect, value: value }}>
      <div className={classNames} ref={componentRef}>
        <Input
          type="text"
          disabled={disabled}
          value={selectState.inputValue}
          onChange={changeInputValue}
          onFocus={focus}
          {...restProps}
          onBlur={blur}
        />
        {selectState.showDropdown && (
          <ul className="select-list">
            {React.Children.map(children, (children, index) => {
              const childrenElement = children as React.FunctionComponentElement<HTMLElement>;
              const { displayName } = childrenElement.type;

              if (displayName !== 'SelectOption') {
                console.error('Waring: Select子节点必须是SelectOption');
              } else {
                return children;
              }
            })}
          </ul>
        )}
      </div>
    </SelectContext.Provider>
  );
};

export default Select;
