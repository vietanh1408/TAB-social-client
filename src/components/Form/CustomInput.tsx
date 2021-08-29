import { Input } from 'antd'
import React from 'react'

type CustomInputProps = {
  placeholder?: string
}

const CustomInput = (props: CustomInputProps) => {
  const { placeholder } = props
  return <Input placeholder={placeholder} />
}

export default CustomInput
