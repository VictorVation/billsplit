import React, { useContext } from "react";
import { PeopleActions } from "../Actions";
import PersonView from "./PersonView";
import { DispatchContext, PeopleState } from "../State";
import { default as cx } from "classnames";

interface IPeopleViewProps {
  people: PeopleState;
}

export default function PeopleView(props: IPeopleViewProps) {
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <div>
        {props.people.map((person, idx) => (
          <PersonView person={person} idx={idx} key={idx} />
        ))}
      </div>
      <div className={cx("row")} style={{ marginTop: "32px" }}>
        {props.people.length < 30 && (
          <button
            onClick={() => dispatch({ type: PeopleActions.ADD_PERSON })}
            className={cx("center", "col", "background-green")}
          >
            Add Person
          </button>
        )}
        {props.people.length > 2 && (
          <button
            onClick={() => dispatch({ type: PeopleActions.REMOVE_PERSON })}
            className={cx("center", "col", "background-red")}
            disabled={props.people.length === 2}
          >
            Remove Person
          </button>
        )}
      </div>
    </>
  );
}
