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
      <div className="cards">
        {props.people.map((person, idx) => (
          <PersonView person={person} idx={idx} key={idx} />
        ))}
      </div>
      <div className={cx("row")}>
        <button
          onClick={() =>
            dispatch({
              type: PeopleActions.ADD_PERSON
            })
          }
          className={cx({
            center: true,
            col: true,
            "background-green": props.people.length < 30
          })}
        >
          Add Person
        </button>
        <button
          onClick={() =>
            dispatch({
              type: PeopleActions.REMOVE_PERSON
            })
          }
          className={cx({
            center: true,
            col: true,
            "background-red": props.people.length > 2
          })}
          disabled={props.people.length === 2}
        >
          Remove Person
        </button>
      </div>
    </>
  );
}
