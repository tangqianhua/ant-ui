import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonSize, ButtonType } from './Button';

const defaultProps = {
  onClick: jest.fn(),
};

const testProps = {
  size: ButtonSize.Large,
  type: ButtonType.Danger,
  className: 'test',
};

const disabledProps = {
  onClick: jest.fn(),
  disabled: true,
};

describe('test Button Component', () => {
  it('should render the default button', () => {
    const wrapper = render(<Button {...defaultProps}>ss-ui</Button>);
    const ele = wrapper.getByText('ss-ui');

    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toEqual('BUTTON');
    expect(ele).toHaveClass('btn btn-default');

    fireEvent.click(ele);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('should render the base button', () => {
    const wrapper = render(
      <Button size={testProps.size} className={testProps.className} btnType={testProps.type}>
        ss-ui
      </Button>,
    );
    const ele = wrapper.getByText('ss-ui');

    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass('btn test btn-danger btn-lg');
  });

  it('测试按钮类型是link', () => {
    const wrapper = render(
      <Button btnType={ButtonType.Link} href="http://www.baidu.com">
        ss-ui
      </Button>,
    );
    const ele = wrapper.getByText('ss-ui');

    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass('btn-link');
    expect(ele.tagName).toEqual('A');
    expect(ele).toHaveAttribute('href', 'http://www.baidu.com');
  });

  it('测试被禁用的按钮', () => {
    const wrapper = render(
      <Button disabled={disabledProps.disabled} {...disabledProps}>
        ss-ui
      </Button>,
    );
    const ele = wrapper.getByText('ss-ui') as HTMLButtonElement;

    expect(ele).toBeInTheDocument();
    expect(ele.disabled).toBeTruthy();
    fireEvent.click(ele);

    expect(disabledProps.onClick).not.toBeCalled();
  });
});
