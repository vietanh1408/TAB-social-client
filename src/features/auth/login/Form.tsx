// libs
import React from 'react'
import { ControllerRenderProps, FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from 'antd'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import Form from 'antd/lib/form/Form'
// image
import facebookIcon from 'assets/facebook-logo 1.png'
import GoogleIcon from 'assets/google-logo 1.png'
// components
import FormItem from 'components/Form/FormItem'
// extensions
import yupExtension from 'extensions/yup'
// models
import { LoginAccount } from 'Models'

type LoginFormProps = {
  handleSubmitForm(args: LoginAccount): void
  title?: string
  text?: string
  isLoading?: boolean
}

const schema = yup.object().shape({
  emailOrPhone: yupExtension.emailOrPhoneRequired,
  password: yupExtension.passwordRequired
})

const LoginForm = (props: LoginFormProps) => {
  const { handleSubmitForm, title, text, isLoading } = props

  const formProps = useForm<LoginAccount>({
    defaultValues: {
      emailOrPhone: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const { handleSubmit } = formProps

  const onSubmit = (data: LoginAccount) => {
    handleSubmitForm(data)
  }

  const handleLoginWithGoogle = () => {
    console.log('login with Google...')
  }

  const handleLoginWithFacebook = () => {
    console.log('login with Facebook...')
  }

  const handleCheckBox = () => {
    console.log('remember me ...')
  }

  return (
    <div className="w-full h-full flex justify-center items-center px-10 xl:px-35">
      <div className="auth_form h-full flex flex-col items-center justify-start px-8 py-8 bg-white rounded-lg">
        <div className="w-full text-4xl font-bold">
          <h2 className="auth_title text-left">{title}</h2>
        </div>
        <div className="auth_desc text-xl w-full py-2">
          <p>{text}</p>
        </div>
        <div className="w-full h-full">
          <FormProvider {...formProps}>
            <Form onFinish={handleSubmit(onSubmit)}>
              {/* Google */}
              <div
                onClick={handleLoginWithGoogle}
                className="auth__social custom__input border-2 border-gray-400 cursor-pointer mb-4 py-2 xl:px-8 flex justify-around items-center"
              >
                <img src={GoogleIcon} alt="google-icon" />
                <p className="font-bold text-xs xl:text-base">
                  Đăng nhập với tài khoản Google
                </p>
              </div>
              {/* End Google */}
              {/* Facebook */}
              <div
                onClick={handleLoginWithFacebook}
                className="auth__social custom__input border-2 border-gray-400 cursor-pointer py-2 xl:px-8 flex justify-around items-center"
              >
                <img src={facebookIcon} alt="google-icon" />
                <p className="font-bold text-xs xl:text-base">
                  Đăng nhập với tài khoản Facebook
                </p>
              </div>
              {/* End Facebook */}

              <div className="w-full my-2 xl:my-4 text-center text-xs xl:text-base">
                <p>Đăng nhập bằng tài khoản</p>
              </div>

              {/* Email */}
              <FormItem
                required={true}
                fieldName="emailOrPhone"
                isValidate={true}
                hideLabel={true}
              >
                {({ onChange, onBlur, value }: ControllerRenderProps) => (
                  <Input
                    className="ant-input-affix-wrapper-lg custom__input"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder={'Email hoặc số điện thoại'}
                  />
                )}
              </FormItem>
              {/* End Email */}
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

              {/* Forgot password */}
              <div className="w-full px-2 xl:px-4 mb-2 xl:mb-8 flex justify-between items-center">
                <Checkbox onChange={handleCheckBox}>
                  <p className="text-xs xl:text-base">Ghi nhớ tài khoản</p>
                </Checkbox>
                <Link
                  to="/forgot-password"
                  className="custom__link text-xs xl:text-base"
                >
                  Quên mật khẩu ?
                </Link>
              </div>
              {/* End forgot password */}

              {/* Button LOGIN */}
              <Button
                type="primary"
                htmlType="submit"
                className="w-full uppercase font-bold text-xl xl:text-2xl bg-black custom__input py-2 px-8"
                size="large"
                loading={isLoading}
              >
                Đăng nhập
              </Button>
              {/* End Button LOGIN */}

              {/* Redirect register */}
              <p className="text-center my-4 text-xs xl:text-lg">
                Nếu bạn chưa có tài khoản? Hãy
                <Link to="/register" className="custom__link px-1">
                  Đăng ký
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

export default LoginForm
