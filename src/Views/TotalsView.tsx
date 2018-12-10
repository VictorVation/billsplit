import React, { useContext } from "react";
import CurrencyInput from "../components/CurrencyInput";
import { default as cx } from "classnames";
import { DispatchContext, TotalsState } from "../State";
import { TotalsActions } from "../Actions";

export default function TotalsView(props: TotalsState) {
  const dispatch = useContext(DispatchContext);
  const { grandtotal, subtotal } = props;

  return (
    <>
      <div className={cx("row")}>
        <div className={cx("col")}>
          <label htmlFor="subtotal">Subtotal</label>
          <CurrencyInput
            onChangeEvent={event => {
              dispatch({ type: TotalsActions.SET_SUBTOTAL, payload: event });
            }}
            value={subtotal}
            name="subtotal"
          />
        </div>
      </div>
      <div className={cx("row")}>
        <div className={cx("col")}>
          <label htmlFor="grandTotal">Grand Total</label>
          <CurrencyInput
            onChangeEvent={event => {
              dispatch({
                type: TotalsActions.SET_GRAND_TOTAL,
                payload: event
              });
            }}
            value={grandtotal}
            name="grandTotal"
          />
        </div>
      </div>
    </>
  );
}
