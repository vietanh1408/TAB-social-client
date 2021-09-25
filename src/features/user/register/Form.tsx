// libs
import React from 'react'
import { ControllerRenderProps, FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from 'antd'
import Form from 'antd/lib/form/Form'
// components
import FormItem from 'components/Form/FormItem'
// extensions
import yupExtension from 'extensions/yup'
// models
import { RegisterAccount } from 'Models'
import { navName } from 'constants/navName'

type RegisterFormProps = {
  handleSubmitForm(args: RegisterAccount): void
  title?: string
  text?: string
  isLoading?: boolean
}

const schema = yup.object().shape({
  name: yupExtension.nameRequired,
  email: yupExtension.emailRequired,
  phone: yupExtension.phoneNumberRequired,
  password: yupExtension.passwordRequired,
  confirmPassword: yupExtension.confirmPassword
})

const RegisterForm: React.FC<RegisterFormProps> = (
  props: RegisterFormProps
) => {
  const { handleSubmitForm, title, text, isLoading } = props

  const formProps = useForm<RegisterAccount>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(schema)
  })

  const { handleSubmit } = formProps

  const onSubmit = (data: RegisterAccount) => {
    handleSubmitForm(data)
  }

  return (
    <div className="w-full h-full flex justify-center items-center xl:px-35">
      <div className="auth_form h-full flex flex-col items-center justify-center px-8 py-8 bg-white rounded-lg">
        <div className="w-full text-4xl font-bold">
          <h2 className="auth_title text-left">{title}</h2>
        </div>
        <div className="auth_desc text-xl w-full py-2">
          <p>{text}</p>
        </div>
        <div className="w-full h-full">
          <FormProvider {...formProps}>
            <Form onFinish={handleSubmit(onSubmit)}>
              {/* Tên đăng nhập */}
              <FormItem
                required={true}
                fieldName="name"
                isValidate={true}
                hideLabel={true}
              >
                {({ onChange, onBlur, value }: ControllerRenderProps) => (
                  <Input
                    className="ant-input-affix-wrapper-lg custom__input"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder={'Tên đăng nhập'}
                  />
                )}
              </FormItem>
              {/* End Tên đăng nhập */}
              {/* Email */}
              <FormItem
                required={true}
                fieldName="email"
                isValidate={true}
                hideLabel={true}
              >
                {({ onChange, onBlur, value }: ControllerRenderProps) => (
                  <Input
                    className="ant-input-affix-wrapper-lg custom__input"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder={'Email'}
                  />
                )}
              </FormItem>
              {/* End Email */}
              {/* Số điện thoại */}
              <FormItem
                required={true}
                fieldName="phone"
                isValidate={true}
                hideLabel={true}
              >
                {({ onChange, onBlur, value }: ControllerRenderProps) => (
                  <Input
                    className="ant-input-affix-wrapper-lg custom__input"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder={'Số điện thoại'}
                  />
                )}
              </FormItem>
              {/* End So dien thoai */}
              {/* Password */}
              <FormItem
                required={true}
                fieldName="password"
                isValidate={true}
                hideLabel={true}
              >
                {({ onChange, onBlur, value }: ControllerRenderProps) => (
                  <Input.Password
                    className="ant-input-affix-wrapper-lg custom__input"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder={'Mật khẩu'}
                  />
                )}
              </FormItem>
              {/* End password */}
              {/* confirmPassword */}
              <FormItem
                required={true}
                fieldName="confirmPassword"
                isValidate={true}
                hideLabel={true}
              >
                {({ onChange, onBlur, value }: ControllerRenderProps) => (
                  <Input.Password
                    className="ant-input-affix-wrapper-lg custom__input"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder={'Nhập lại mật khẩu'}
                  />
                )}
              </FormItem>
              {/* End confirmPassword */}

              {/* Button REGISTER */}
              <Button
                type="primary"
                htmlType="submit"
                className="w-full uppercase font-bold text-xl xl:text-2xl bg-black custom__input py-2 px-8"
                size="large"
                loading={isLoading}
              >
                Đăng ký
              </Button>
              {/* End Button REGISTER */}

              {/* Redirect register */}
              <p className="text-center my-4 text-xs xl:text-lg">
                Nếu bạn đã có tài khoản? Hãy
                <Link to={navName.LOGIN} className="custom__link px-1">
                  Đăng nhập
                </Link>
                ngay
              </p>
              {/* End Redirect register */}
            </Form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
