import React, { useContext } from 'react';
import classnames from 'classnames';
import { MenuContext } from './Menu';

type MenuItemMode = 'vertical' | 'horizontal';

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const classNames = classnames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': index === context.index,
  });

  const handleClick = () => {
    if (!disabled && context.onSelected && typeof index === 'string') {
      context.onSelected(index);
    }
  };

  return (
    <li key={index} className={classNames} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};
MenuItem.defaultProps = {
  disabled: false,
};
MenuItem.displayName = 'MenuItem';

export default MenuItem;
