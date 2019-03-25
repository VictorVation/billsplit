import { DispatchContext, Person } from "../State";
import React, { useContext } from "react";

import CurrencyInput from "../components/CurrencyInput";
import InkButton from "../components/InkButton";
import { PersonActions } from "../Actions";
import { default as cx } from "classnames";

interface IPersonViewProps {
  idx: number;
  person: Person;
}

export default function PersonView(props: IPersonViewProps) {
  const { idx, person } = props;
  const dispatch = useContext(DispatchContext);

  const isMobile = navigator.userAgent.match("Mobi");

  const handleChangeEvent = (shareIndex, value) => {
    dispatch({
      type: PersonActions.CHANGE_SHARE_VALUE,
      payload: { index: idx, shareIndex, value }
    });
  };

  return (
    <>
      <label contentEditable htmlFor={`person-${idx}`}>
        Person {idx + 1}
      </label>
      {person.shares.length > 1 && (
        <span style={{ fontSize: "12px" }}>
          {`· Total: ${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          }).format(person.personTotal)}`}
        </span>
      )}
      <div className={cx("row")}>
        {person.shares.map((shareValue, shareIdx) => {
          return (
            <CurrencyInput
              key={shareIdx}
              onChangeEvent={value => handleChangeEvent(shareIdx, value)}
              value={shareValue}
              name={shareIdx === 0 ? `person-${idx}` : undefined}
              id={shareIdx === 0 ? `person-${idx}` : undefined}
            />
          );
        })}
        {person.shares.length > 1 && (
          <InkButton
            className="col-1"
            onClick={e => {
              e.preventDefault();
              dispatch({
                type: PersonActions.DECREMENT_SHARES,
                payload: { index: props.idx }
              });
            }}
          >
            {isMobile ? "Remove Item" : "-"}
          </InkButton>
        )}
        {person.shares.length <= 8 && (
          <InkButton
            className="col-1"
            onClick={e => {
              e.preventDefault();
              dispatch({
                type: PersonActions.INCREMENT_SHARES,
                payload: { index: props.idx }
              });
            }}
          >
            {isMobile ? "Add Item" : "+"}
          </InkButton>
        )}
      </div>
    </>
  );
}
