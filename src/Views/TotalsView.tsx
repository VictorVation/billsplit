import { DispatchContext, TotalsState } from "../State";
import React, { useContext } from "react";

import CurrencyInput from "../components/CurrencyInput";
import { TotalsActions } from "../Actions";
import { default as cx } from "classnames";

export default function TotalsView(props: { totals: TotalsState }) {
  const dispatch = useContext(DispatchContext);
  const { grandtotal, subtotal } = props.totals;

  return (
    <>
      <div className={cx("row")}>
        <div className={cx("col")}>
          <label htmlFor="subtotal">Subtotal</label>
          <span style={{ fontSize: "12px" }}>
            {"· "}Sum of the prices of all items
          </span>
          <CurrencyInput
            onChangeEvent={value => {
              dispatch({
                type: TotalsActions.SET_SUBTOTAL,
                payload: { value }
              });
            }}
            value={subtotal}
            name="subtotal"
            id="subtotal"
          />
        </div>
      </div>
      <div className={cx("row")}>
        <div className={cx("col")}>
          <label htmlFor="grandTotal">Grand Total</label>
          <span style={{ fontSize: "12px" }}>
            {"· "}Entire amount paid, including tax and tip
          </span>
          <CurrencyInput
            onChangeEvent={value => {
              dispatch({
                type: TotalsActions.SET_GRAND_TOTAL,
                payload: { value }
              });
            }}
            value={grandtotal}
            name="grandTotal"
            id="grandTotal"
          />
        </div>
      </div>
    </>
  );
}
