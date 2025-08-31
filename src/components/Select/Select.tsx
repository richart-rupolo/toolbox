import React from 'react'
import ReactSelect from 'react-select'
import type { Props as SelectProps, StylesConfig } from 'react-select' // ✅ import como tipo

interface OptionType {
  label: string
  value: string
}

interface Props extends Omit<SelectProps<OptionType, false>, 'options'> {
  options: OptionType[]
}

const customStyles: StylesConfig<OptionType, false> = {
  control: (base) => ({
    ...base,
    background: '#050508',
    borderColor: '#2a2a3e',
    color: '#fff',
    minHeight: '38px',
  }),
  menu: (base) => ({ ...base, background: '#050508', color: '#fff' }),
  singleValue: (base) => ({ ...base, color: '#fff' }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? '#1a1a2e' : '#050508',
    color: '#fff',
    cursor: 'pointer',
  }),
  dropdownIndicator: (base) => ({ ...base, color: '#00ff41' }),
  indicatorSeparator: () => ({ display: 'none' }),
}

const Select: React.FC<Props> = ({ options, ...props }) => {
  return <ReactSelect options={options} styles={customStyles} {...props} />
}

export default Select
