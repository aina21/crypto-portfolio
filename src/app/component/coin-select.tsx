import { ErrorMessage, Field } from "formik";

export const CoinSelect: React.FC<{ name: string }> = ({ name }) => (
  <div>
    <Field
      as="select"
      name={name}
      className="block w-full p-2 border rounded focus:outline-none h-[44px] text-emerald-950"
    >
      <option value="" disabled>
        Select a coin
      </option>
      <option value="ethereum">ETH</option>
      <option value="bitcoin">BTC</option>
      <option value="cardano">ADA</option>
    </Field>
    <ErrorMessage name={name} component="div" className="text-rose-500" />
  </div>
);
