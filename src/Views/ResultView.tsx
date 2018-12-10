import React, { useContext } from "react";
import { DispatchContext, ResultState } from "../State";
import { default as cx } from "classnames";

interface IResultViewProps {
  result: ResultState;
}

export default function PeopleView(props: IResultViewProps) {
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <h4>Results</h4>
      <table>
        <tbody>
          <td>Hey</td>
          <td>Hey</td>
        </tbody>
      </table>
    </>
  );
}
