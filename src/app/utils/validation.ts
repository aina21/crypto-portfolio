import * as yup from "yup";

export const validationSchema = yup.object().shape({
  balancePairs: yup.array().of(
    yup.object().shape({
      coin: yup.string().required("Please select a coin"),
      balance: yup
        .number()
        .min(0, "Balance must be non-negative")
        .required("Please enter a balance"),
    })
  ),
});