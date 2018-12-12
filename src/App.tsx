import React from "react";
import { AppState, DispatchContextProvider } from "./State";
import PeopleView from "./views/PeopleView";
import TotalsView from "./views/TotalsView";
import ResultView from "./views/ResultView";
import FooterView from "./views/FooterView";
import "./App.css";

export default function App() {
  return (
    <DispatchContextProvider>
      {(state: AppState) => (
        <div className="container center">
          <h1>billsplit</h1>
          <PeopleView people={state.people} />
          <hr />
          <TotalsView totals={state.totals} />
          <ResultView result={state.result} />
          <FooterView />
        </div>
      )}
    </DispatchContextProvider>
  );
}
