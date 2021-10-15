const validate = {
  required: 'Mục này không được để trống',
  name: 'Tên đăng nhập phải có ít nhất 5 ký tự',
  email: 'Email không đúng định dạng',
  phone: 'Số điện thoại phải có ít nhất 9 số và bắt đầu bằng số 0',
  password: 'Mật khẩu phải có ít nhát 6 ký tự',
  confirmPassword: 'Mật khẩu không trùng khớp',
  emailOrPhone: 'Email hoặc số điện thoại không đúng',
  code: 'Mã code phải có 6 ký tự và không có ký tự đặc biệt'
}

export default validate
