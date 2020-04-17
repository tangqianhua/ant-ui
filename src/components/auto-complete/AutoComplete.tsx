import React, { useState, useEffect, useRef, KeyboardEvent, ReactElement } from 'react';
import classnames from 'classnames';

import Input, { InputProps } from '../input/Input';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';

interface DateSourceOptions {
  value: string;
}
type DateSource<T = {}> = T & DateSourceOptions;

type FetchSuggestionsCb = (value: DateSource[]) => void;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (item: string, cb: FetchSuggestionsCb) => void;
  onSelect?: (item: string) => void;
  renderOption?: (item: DateSource) => ReactElement;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<DateSource[]>([]);
  const debounceValue = useDebounce(inputValue, 1000);
  const [highlight, setHighlight] = useState(-1);
  const dropdownState = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });

  useEffect(() => {
    if (debounceValue && dropdownState.current) {
      fetchSuggestions(debounceValue, (resultValue) => {
        setSuggestions(resultValue);
      });
    } else {
      setSuggestions([]);
    }
  }, [debounceValue, fetchSuggestions]);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value.trim();
    const exclude = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;

    if (exclude.test(targetValue)) {
      setInputValue(targetValue.replace(exclude, ''));
    } else {
      setInputValue(targetValue);
    }
    setHighlight(-1);
    dropdownState.current = true;
  };

  const handleSelect = (item: DateSource) => {
    setInputValue(item.value);
    setSuggestions([]);
    dropdownState.current = false;
    onSelect && onSelect(item.value);
  };

  const renderDropdown = (item: DateSource) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const highlightIndex = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) index = suggestions.length - 1;

    setHighlight(index);
  };

  const keydown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        handleSelect(suggestions[highlight]);
        break;
      case 38:
        highlightIndex(highlight - 1);
        break;
      case 40:
        highlightIndex(highlight + 1);
        break;
      case 27:
        setSuggestions([]);
        break;
      default:
        break;
    }
  };

  const generatorDropdown = () => {
    return (
      <ul className="suggestion-list">
        {suggestions.map((item, index) => {
          const cls = classnames('suggestion-item', {
            'is-active': index === highlight,
          });
          return (
            <li
              className={cls}
              key={index}
              onClick={() => {
                handleSelect(item);
              }}
            >
              {renderDropdown(item)}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="auto-complete" ref={componentRef}>
      <Input value={inputValue} {...restProps} onChange={changeInput} onKeyDown={keydown}></Input>
      {suggestions.length > 0 && generatorDropdown()}
    </div>
  );
};

export default AutoComplete;
