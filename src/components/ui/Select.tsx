import React from 'react'
import ReactSelect from 'react-select'
import type { Props as SelectProps, StylesConfig } from 'react-select'

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
    background: 'var(--color-bg-surface)',
    borderColor: 'var(--color-border-default)',
    color: 'var(--color-text-primary)',
    minHeight: 'var(--control-height-md)',
  }),
  menu: (base) => ({
    ...base,
    background: 'var(--color-bg-surface)',
    color: 'var(--color-text-primary)',
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--color-text-primary)',
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? 'var(--color-bg-elevated)' : 'var(--color-bg-surface)',
    color: 'var(--color-text-primary)',
    cursor: 'pointer',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: 'var(--color-accent-primary)',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
}

const Select: React.FC<Props> = ({ options, ...props }) => {
  return <ReactSelect options={options} styles={customStyles} {...props} />
}

export default Select
