import * as yup from 'yup'
import validate from 'constants/validate'

const stringRequired = yup
  .string()
  .required(validate.required)
  .typeError(validate.required)
  .trim(validate.required)

const emailRegex =
  /^(([^<>!~#$%()[\]\\.,;:@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z-\s]{2,}))$/

const codeRegex = /^[A-Za-z0-9]+$/

const emailRequired = yup
  .string()
  .matches(emailRegex, validate.email)
  .required(validate.required)
  .typeError(validate.required)
  .trim(validate.required)

const passwordRequired = yup
  .string()
  .required(validate.required)
  .typeError(validate.required)
  .trim(validate.required)
  .min(6, validate.password)

const confirmPassword = yup
  .string()
  .required(validate.required)
  .typeError(validate.required)
  .trim(validate.required)
  .oneOf([yup.ref('password'), null], validate.confirmPassword)

const phoneNumberRequired = yup
  .string()
  .required(validate.required)
  .typeError(validate.required)
  .trim(validate.required)
  .min(10, validate.phone)
  .test('Check prefix', validate.phone, function () {
    let startCharactor = '0'
    let phone = this.parent['phone']
    return phone.startsWith(startCharactor) ? true : false
  })

const nameRequired = yup
  .string()
  .required(validate.required)
  .typeError(validate.required)
  .trim(validate.required)
  .min(5, validate.name)

const emailOrPhoneRequired = yup
  .string()
  .required(validate.required)
  .test('test-name', validate.emailOrPhone, function (value: any) {
    const phoneRegex = /^(\+84-|\+84|0)+\d{9}$/
    let isValidEmail = emailRegex.test(value)
    let isValidPhone = phoneRegex.test(value)
    if (!isValidEmail && !isValidPhone) {
      return false
    }
    return true
  })

const codeRequired = yup
  .string()
  .required(validate.required)
  .min(6, validate.code)
  .max(6, validate.code)
  .matches(codeRegex, validate.code)

const yupExtension = {
  stringRequired,
  emailRequired,
  passwordRequired,
  confirmPassword,
  phoneNumberRequired,
  nameRequired,
  emailOrPhoneRequired,
  codeRequired
}
export default yupExtension
