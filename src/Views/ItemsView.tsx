import { DispatchContext, PeopleState } from "../State";
import React, { useContext } from "react";

import InkButton from "../components/InkButton";
import { PeopleActions } from "../Actions";
import PersonView from "./PersonView";
import { default as cx } from "classnames";

interface IPeopleViewProps {
  people: PeopleState;
}

export default function ItemsView(props: IPeopleViewProps) {
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <h4>Items</h4>
      <div>
        {props.people.map((person, idx) => (
          <PersonView person={person} idx={idx} key={idx} />
        ))}
      </div>
      <div>
        <strong>Running Total:</strong> $
        {props.people.reduce(
          (total, person) =>
            total +
            person.shares.reduce(
              (personalTotal, share) => personalTotal + share,
              0
            ),
          0
        )}
      </div>
      <div className={cx("row")} style={{ marginTop: "32px" }}>
        {props.people.length < 30 && (
          <InkButton
            onClick={event => {
              event.preventDefault();
              dispatch({ type: PeopleActions.ADD_PERSON });
            }}
            className={cx("center", "col", "background-green")}
          >
            Add Person
          </InkButton>
        )}
        {props.people.length > 2 && (
          <InkButton
            onClick={event => {
              event.preventDefault();
              dispatch({ type: PeopleActions.REMOVE_PERSON });
            }}
            className={cx("center", "col", "background-red")}
            disabled={props.people.length === 2}
          >
            Remove Person
          </InkButton>
        )}
      </div>
    </>
  );
}
