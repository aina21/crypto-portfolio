import { ErrorMessage, Field } from "formik";

export const BalanceInput: React.FC<{ name: string }> = ({ name }) => (
  <div>
    <Field
      type="number"
      name={name}
      placeholder="Enter balance"
      className="block w-full p-2 border rounded h-[44px] text-emerald-950"
    />
    <ErrorMessage name={name} component="div" className="text-rose-500" />
  </div>
);
