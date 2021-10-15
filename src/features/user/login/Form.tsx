// libs
import React from 'react'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import { ControllerRenderProps, FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from 'antd'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import Form from 'antd/lib/form/Form'
// components
import FormItem from 'components/Form/FormItem'
import { navName } from 'constants/navName'
// extensions
import yupExtension from 'extensions/yup'
// models
import { LoginAccount, LoginGoogle } from 'Models'

type LoginFormProps = {
  handleSubmitForm(args: LoginAccount): void
  handleLoginGoogle(args: LoginGoogle): void
  title?: string
  text?: string
  isLoading?: boolean
}

const schema = yup.object().shape({
  emailOrPhone: yupExtension.emailOrPhoneRequired,
  password: yupExtension.passwordRequired
})

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const { handleLoginGoogle, handleSubmitForm, title, text, isLoading } = props

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

  const handleLoginWithGoogle = (response: any) => {
    handleLoginGoogle(response)
  }

  const handleLoginWithFacebook = (response: any) => {
    console.log('login with Facebook...', response)
  }

  const handleCheckBox = () => {
    console.log('remember me ...')
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
              {/* Google */}
              <GoogleLogin
                className="auth__social custom__input w-full border-2 border-gray-400 cursor-pointer mb-4 py-2 xl:px-8 flex justify-around items-center outline-none"
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                buttonText="Đăng nhập với tài khoản Google"
                onSuccess={handleLoginWithGoogle}
                cookiePolicy={'single_host_origin'}
              />
              {/* End Google */}
              {/* Facebook */}
              <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_ID}`}
                autoLoad={false}
                fields="name,email,picture"
                callback={handleLoginWithFacebook}
                icon="fa-facebook"
                cssClass="fb-btn"
                textButton="Đăng nhập với tài khoản Facebook"
              />
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
                  to={navName.FORGOT_PASSWORD}
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
                <Link to={navName.REGISTER} className="custom__link px-1">
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
