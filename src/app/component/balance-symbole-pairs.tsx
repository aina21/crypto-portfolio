import { FieldArray } from "formik";
import { CoinSelect } from "./coin-select";
import { BalanceInput } from "./balance-input";
import { BalancePair } from "../page";

export const BalanceSymbolPairs = () => (
  <FieldArray name="balancePairs">
    {(arrayHelpers) => (
      <div>
        {arrayHelpers.form.values.balancePairs.map(
          (pair: BalancePair, index: number) => (
            <div
              key={index}
              className="flex flex-col md:space-x-3 md:flex-row mb-4 space-y-4 md:space-y-0 "
            >
              <div className="md:w-1/2 ">
                <label
                  htmlFor={`balancePairs[${index}].coin`}
                  className="block text-sm font-bold mb-2"
                >
                  Coin:
                </label>
                <CoinSelect
                  name={`balancePairs[${index}].coin`}
                  value={pair.coin}
                />
              </div>
              <div className="md:w-1/2">
                <label
                  htmlFor={`balancePairs[${index}].balance`}
                  className="block text-sm font-bold mb-2"
                >
                  Balance:
                </label>
                <BalanceInput name={`balancePairs[${index}].balance`} />
              </div>
              <div className="max-h-[40px] flex space-x-2 md:relative md:top-[30px]  ">
                <button
                  type="button"
                  onClick={() => arrayHelpers.remove(index)}
                  disabled={arrayHelpers.form.values.balancePairs.length <= 2}
                  className="bg-green-300 text-white py-2 px-4  hover:bg-green-200 rounded-full "
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => arrayHelpers.push({ coin: "", balance: "" })}
                  className="bg-green-300 text-white py-2 px-4  hover:bg-green-200 rounded-full   "
                >
                  +
                </button>
              </div>
            </div>
          )
        )}
      </div>
    )}
  </FieldArray>
);
