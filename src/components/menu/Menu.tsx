import React, { createContext, useState } from 'react';
import classnames from 'classnames';
import { MenuItemProps } from './MenuItem';

type MenuMode = 'vertical' | 'horizontal';
type MenuSelected = (selectedIndex: string) => void;

export interface IMenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: MenuSelected;
}

interface IMenuContext {
  index: string;
  onSelected?: MenuSelected;
  mode?: MenuMode;
}

export const MenuContext = createContext<IMenuContext>({ index: '0' });

const Menu: React.FC<IMenuProps> = (props) => {
  const { className, style, mode, children, defaultIndex, onSelect } = props;

  const [currentIndex, setIndex] = useState(defaultIndex || '0');

  const handleClick = (index: string) => {
    setIndex(index);
    onSelect && onSelect(currentIndex);
  };

  const passedContext: IMenuContext = {
    index: currentIndex || '0',
    onSelected: handleClick,
    mode: mode,
  };

  const classNames = classnames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal',
  });

  const renderChildren = () => {
    return React.Children.map(children, (children, index) => {
      const childrenElement = children as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childrenElement.type;

      if (displayName === 'MenuItem' || displayName === 'SubMenuItem') {
        return React.cloneElement(childrenElement, { index: String(index) });
      } else {
        console.error('Waring: Menu的子节点必须是MenuItem');
      }
    });
  };

  return (
    <ul className={classNames} style={style} data-testid="menu">
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: '0',
};

export default Menu;
