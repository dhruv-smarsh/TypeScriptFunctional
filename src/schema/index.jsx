import * as Yup from 'yup';

export const signUpSchema = Yup.object({
    country: Yup.string().required("Please enter Yor name")
});
