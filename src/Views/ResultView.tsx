import { DispatchContext, ResultState } from "../State";
import React, { useContext } from "react";

import InkButton from "../components/InkButton";
import { ResultActions } from "../Actions";
import { default as cx } from "classnames";

interface IResultViewProps {
  result: ResultState | null;
}

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});
export default function ResultView(props: IResultViewProps) {
  const dispatch = useContext(DispatchContext);
  const result = props.result;
  return (
    <>
      <InkButton
        className={cx("background-blue")}
        onClick={() =>
          dispatch({
            type: ResultActions.CALCULATE_RESULT
          })
        }
        type="submit"
      >
        Calculate
      </InkButton>
      {result && (
        <>
          <hr />
          <h4>Results</h4>
          <div className="row" style={{ borderBottom: "1px solid #111" }}>
            <div className="col">
              <h6>Person</h6>
            </div>
            <div className="col">
              <h6>Amount Owed</h6>
            </div>
            <div className="col">
              <h6>Breakdown</h6>
            </div>
          </div>
          {result.results.map(
            ({ personalTotal, percentOfGrandTotal, amountOwed }, idx) => (
              <div className="row" key={idx}>
                <div className="col">Person {idx + 1}</div>
                <div className="col" style={{ fontWeight: "bold" }}>
                  {USD.format(amountOwed)}
                </div>
                <div className="col">
                  {USD.format(personalTotal)}
                  <span style={{ fontSize: "12px" }}> (Items)</span>
                  {" + "}
                  {USD.format(
                    percentOfGrandTotal * (result.grandtotal - result.subtotal)
                  )}
                  <span style={{ fontSize: "12px" }}> (Tax & Tip)</span>
                </div>
              </div>
            )
          )}
        </>
      )}
    </>
  );
}
