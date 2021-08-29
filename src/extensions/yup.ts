import * as yup from 'yup'
import validate from 'constants/validate'

const stringRequired = yup
  .string()
  .required(validate.required)
  .typeError(validate.required)
  .trim(validate.required)

const emailRegex =
  /^(([^<>!~#$%()[\]\\.,;:@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z-\s]{2,}))$/

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

const yupExtension = {
  stringRequired,
  emailRequired,
  passwordRequired,
  confirmPassword,
  phoneNumberRequired,
  nameRequired
}
export default yupExtension
