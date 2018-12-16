import { DispatchContext, ResultState } from "../State";
import React, { useContext } from "react";

import { ResultActions } from "../Actions";
import { default as cx } from "classnames";

interface IResultViewProps {
  result: ResultState | null;
}

export default function ResultView(props: IResultViewProps) {
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <button
        className={cx("background-blue")}
        onClick={() => dispatch({ type: ResultActions.CALCULATE_RESULT })}
      >
        Calculate
      </button>
      {props.result && (
        <>
          <hr />
          <h4>Results</h4>

          {props.result.splits.map((split, idx) => (
            <div className="row" key={idx}>
              <div className="col">Person {idx + 1}</div>
              <div className="col">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD"
                }).format(split)}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
