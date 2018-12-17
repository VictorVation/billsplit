import "./App.css";

import { AppState, DispatchContextProvider } from "./State";

import FooterView from "./views/FooterView";
import ItemsView from "./views/ItemsView";
import React from "react";
import ResultView from "./views/ResultView";
import TotalsView from "./views/TotalsView";

export default function App() {
  return (
    <DispatchContextProvider>
      {(state: AppState) => (
        <div className="container center">
          <h1>billsplit</h1>
          <ItemsView people={state.people} />
          <hr />
          <TotalsView totals={state.totals} />
          <ResultView result={state.result} />
          <FooterView />
        </div>
      )}
    </DispatchContextProvider>
  );
}
