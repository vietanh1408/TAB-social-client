import React from 'react'
import Form, { FormItemProps as AntFormItemProps } from 'antd/lib/form'
import classNames from 'classnames'
import {
  Controller,
  useFormContext,
  get,
  ControllerRenderProps,
  InputState
} from 'react-hook-form'
import ErrorMessage from './ErrorMessage'
import { FORM_ITEM_LAYOUT } from 'constants/index'

const AntFormItem = Form.Item

type ItemProps = {
  fieldName: string
  isValidate: boolean
  children: (props: ControllerRenderProps, state: InputState) => JSX.Element
  defaultValue?: any
  hideLabel?: boolean
}

type FormItemProps = ItemProps & AntFormItemProps

const FormItem: React.FC<FormItemProps> = (props: FormItemProps) => {
  const { control, errors } = useFormContext()

  const {
    fieldName,
    isValidate,
    label,
    required,
    className,
    children,
    hideLabel
  } = props

  const layout = hideLabel === true ? {} : FORM_ITEM_LAYOUT

  return (
    <AntFormItem
      {...layout}
      className={classNames('mb-0', className)}
      label={label}
      required={required}
      labelAlign="left"
    >
      <div
        className={classNames({
          'ant-form-item-has-error': !!get(errors, fieldName)
        })}
      >
        <Controller control={control} name={fieldName} render={children} />
      </div>
      <ErrorMessage fieldName={fieldName} validate={isValidate} />
    </AntFormItem>
  )
}

export default FormItem
