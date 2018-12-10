import React, { useContext } from "react";
import CurrencyInput from "../components/CurrencyInput";
import { PersonActions } from "../Actions";
import { default as cx } from "classnames";
import { DispatchContext, Person } from "../State";

interface IPersonViewProps {
  idx: number;
  person: Person;
}

export default function PersonView(props: IPersonViewProps) {
  const { idx, person } = props;
  const dispatch = useContext(DispatchContext);

  const handleChangeEvent = () => {};

  return (
    <div className={cx("card")}>
      <h5 className={cx("card-header")} style={{ cursor: "pointer" }}>
        Person {idx}
      </h5>
      <div className={cx("card-body", "row")}>
        {person.shares.map((shareValue, idx) => (
          <CurrencyInput
            key={idx}
            onChangeEvent={handleChangeEvent}
            value={shareValue}
          />
        ))}
        <button
          className={cx("outline", "col-1")}
          onClick={() =>
            dispatch({
              type: PersonActions.INCREMENT_SHARES,
              payload: props.idx
            })
          }
          disabled={person.shares.length === 8}
        >
          +
        </button>
        <button
          className={cx("outline", "col-1")}
          onClick={() =>
            dispatch({
              type: PersonActions.DECREMENT_SHARES,
              payload: props.idx
            })
          }
          disabled={person.shares.length === 1}
        >
          -
        </button>
      </div>
      <div>Total: ${person.personTotal}</div>
    </div>
  );
}
