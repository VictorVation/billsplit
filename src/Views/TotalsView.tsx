import React, { useContext } from "react";
import CurrencyInput from "../components/CurrencyInput";
import { default as cx } from "classnames";
import { DispatchContext, TotalsState } from "../State";
import { TotalsActions } from "../Actions";

export default function TotalsView(props: { totals: TotalsState }) {
  const dispatch = useContext(DispatchContext);
  const { grandtotal, subtotal } = props.totals;

  return (
    <>
      <div className={cx("row")}>
        <div className={cx("col")}>
          <label htmlFor="subtotal">
            Subtotal <abbr title="Sum of the prices of all items">[?]</abbr>
          </label>
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
          <label htmlFor="grandTotal">
            Grand Total{" "}
            <abbr title="Sum of all items, plus tax and tip">[?]</abbr>
          </label>
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
