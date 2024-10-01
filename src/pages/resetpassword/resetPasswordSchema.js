import * as yup from 'yup';

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .matches(/[A-Z]/, 'Mật khẩu phải có ít nhất một ký tự hoa')
    .matches(/[a-z]/, 'Mật khẩu phải có ít nhất một ký tự thường')
    .matches(/[0-9]/, 'Mật khẩu phải có ít nhất một chữ số')
    .matches(/[@$!%*?&]/, 'Mật khẩu phải có ít nhất một ký tự đặc biệt'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
    .required('Mật khẩu xác nhận là bắt buộc'),
});

export { resetPasswordSchema };
