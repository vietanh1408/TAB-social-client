import React from 'react'
import { useFormContext, get } from 'react-hook-form'

type ErrorMessageProps = {
  fieldName: string
  validate: boolean
}

const ErrorMessage: React.FC<ErrorMessageProps> = (
  props: ErrorMessageProps
) => {
  const { errors } = useFormContext()

  const { fieldName, validate } = props

  return validate ? (
    <div className="ant-form-item-explain ant-form-item-explain-error">
      {get(errors, fieldName)?.message ?? null}
    </div>
  ) : null
}

export default ErrorMessage
