import * as yup from "yup";

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .email('Địa chỉ email không hợp lệ').required('Vui lòng nhập địa chỉ email'),


});
