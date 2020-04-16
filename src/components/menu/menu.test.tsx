import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';

import Menu, { IMenuProps } from './Menu';
import MenuItem from './MenuItem';

const testProps: IMenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
};

const testVerProps: IMenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
};

const generateMenu = (props: IMenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index="0">active</MenuItem>
      <MenuItem index="1">activeTwo</MenuItem>
      <MenuItem index="2" disabled>
        disabled
      </MenuItem>
    </Menu>
  );
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  activeTwoElement: HTMLElement,
  disabledElement: HTMLElement;

describe('test menu', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    menuElement = wrapper.getByTestId('menu');
    activeElement = wrapper.getByText('active');
    activeTwoElement = wrapper.getByText('activeTwo');
    disabledElement = wrapper.getByText('disabled');
  });

  it('测试普通的菜单', () => {
    expect(menuElement).toBeInTheDocument();

    expect(activeElement).toBeInTheDocument();
    expect(activeElement).toHaveClass('is-active');

    expect(disabledElement).toBeInTheDocument();
    expect(disabledElement).toHaveClass('is-disabled');
  });

  it('测试点击事件', () => {
    fireEvent.click(disabledElement);
    expect(testProps.onSelect).not.toHaveBeenCalled();

    fireEvent.click(activeTwoElement);
    expect(testProps.onSelect).toHaveBeenCalled();

    expect(activeElement).not.toHaveClass('is-active');
  });

  it('测试方向是不是vertical', () => {
    cleanup();

    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId('menu');
    expect(menuElement).toHaveClass('menu-vertical');
  });
});
