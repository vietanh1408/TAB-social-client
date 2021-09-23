import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from 'antd'
import Form from 'antd/lib/form/Form'
import FormItem from 'components/Form/FormItem'
import yupExtension from 'extensions/yup'
import { VerifyEmailInput } from 'Models'
import React from 'react'
import { ControllerRenderProps, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

type VerifyEmailProps = {
  handleSubmitForm(args: VerifyEmailInput): void
  title?: string
}

const schema = yup.object().shape({
  code: yupExtension.codeRequired
})

const VerifyForm: React.FC<VerifyEmailProps> = (props: VerifyEmailProps) => {
  const { handleSubmitForm, title } = props
  const formProps = useForm<VerifyEmailInput>({
    defaultValues: {
      code: ''
    },
    resolver: yupResolver(schema)
  })

  const { handleSubmit } = formProps

  const onSubmit = (data: VerifyEmailInput) => {
    handleSubmitForm(data)
  }

  return (
    <div className="w-96 border-gray-400 border-2 rounded-md p-4 bg-white">
      <h2 className="text-center mb-4 text-2xl font-bold">{title}</h2>
      <FormProvider {...formProps}>
        <Form onFinish={handleSubmit(onSubmit)}>
          {/* Tên đăng nhập */}
          <FormItem
            required={true}
            fieldName="code"
            isValidate={true}
            hideLabel={true}
          >
            {({ onChange, onBlur, value }: ControllerRenderProps) => (
              <Input
                className="ant-input-affix-wrapper-lg custom__input"
                value={value}
                onBlur={onBlur}
                onChange={(e) => onChange(e.target.value.toLocaleUpperCase())}
                placeholder={'Nhập mã xác thực 6 ký tự'}
              />
            )}
          </FormItem>
          {/* End Tên đăng nhập */}

          {/* Button REGISTER */}
          <Button
            type="primary"
            htmlType="submit"
            className="w-full uppercase font-bold text-xl xl:text-2xl bg-black custom__input py-2 px-8"
            size="large"
            //   loading={isLoading}
          >
            Xác thực
          </Button>
          {/* End Button REGISTER */}
        </Form>
      </FormProvider>
    </div>
  )
}

export default VerifyForm
