import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { MenuContext } from './Menu';
import { MenuItemProps } from './MenuItem';

export interface ISubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenuItem: React.FC<ISubMenuProps> = (props) => {
  const [menuOpen, setOpen] = useState(false);
  const context = useContext(MenuContext);

  const { index, title, className, children } = props;
  const classNames = classnames('menu-item submenu-item', className, {
    'is-active': index === context.index,
  });

  const handleClick = () => {
    if (context.onSelected && typeof index === 'string') {
      context.onSelected(index);
    }
  };

  const handleClickSubMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    handleClick();
    setOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };

  const clickEvent =
    context.mode !== 'horizontal'
      ? {
          onClick: handleClickSubMenu,
        }
      : {};
  const mouseEvent =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
          onClick: handleClick,
        }
      : {};

  const renderChildren = () => {
    const childComponentElement = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;

      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index: `${index}-${i}` });
      } else {
        console.error('Waring: SubMenu的子节点必须是MenuItem');
      }
    });

    const openClass = classnames('submenu', {
      'menu-opened ': menuOpen,
    });

    return <ul className={openClass}>{childComponentElement}</ul>;
  };

  return (
    <li key={index} className={classNames} {...mouseEvent}>
      <div className="submenu-title" {...clickEvent}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenuItem.displayName = 'SubMenuItem';

export default SubMenuItem;
