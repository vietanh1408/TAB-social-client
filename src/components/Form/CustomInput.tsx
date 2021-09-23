import React from 'react'
import { Input } from 'antd'

type CustomInputProps = {
  placeholder?: string
}

const CustomInput: React.FC<CustomInputProps> = (props: CustomInputProps) => {
  const { placeholder } = props
  return <Input placeholder={placeholder} />
}

export default CustomInput
