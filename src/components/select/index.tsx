import { FC } from 'react';
import Select, { ISelectProps } from './Select';
import SelectOption, { ISelectOptionProps } from './SelectOption';

type SelectType = FC<ISelectProps> & {
  SelectOption: FC<ISelectOptionProps>;
};

const TransSelect: SelectType = Select as SelectType;

TransSelect.SelectOption = SelectOption;

export default TransSelect;
