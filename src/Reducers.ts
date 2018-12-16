import {
  Action,
  PeopleActions,
  PersonActions,
  ResultActions,
  TotalsActions
} from "./Actions";
import { AppState, PeopleState, ResultState, TotalsState } from "./State";

import Swal from "sweetalert2";

function peopleReducer(state: AppState, action: Action): PeopleState {
  switch (action.type) {
    case PeopleActions.ADD_PERSON: {
      if (state.people.length === 30) {
        return state.people;
      }
      return [...state.people, { shares: [0], personTotal: 0 }];
    }
    case PeopleActions.REMOVE_PERSON: {
      if (state.people.length === 2) {
        return state.people;
      }
      return state.people.slice(0, -1);
    }
    case PersonActions.INCREMENT_SHARES:
    case PersonActions.DECREMENT_SHARES:
    case PersonActions.CHANGE_SHARE_VALUE:
      return personReducer(state.people, action);
    default:
      return state.people;
  }
}

function personReducer(state: PeopleState, action: Action): PeopleState {
  switch (action.type) {
    case PersonActions.INCREMENT_SHARES: {
      return state.map((item, idx) => {
        if (
          action.payload != null &&
          action.payload.index != null &&
          idx === action.payload.index
        ) {
          return { ...item, shares: item.shares.concat([0]) };
        }
        return item;
      });
    }
    case PersonActions.DECREMENT_SHARES: {
      return state.map((item, idx) => {
        if (
          action.payload != null &&
          action.payload.index != null &&
          idx === action.payload.index
        ) {
          return { ...item, shares: item.shares.slice(0, -1) };
        }
        return item;
      });
    }
    case PersonActions.CHANGE_SHARE_VALUE: {
      return state.map((item, idx) => {
        if (
          action.payload != null &&
          action.payload.shareIndex != null &&
          action.payload.value != null &&
          idx === action.payload.index
        ) {
          const newShares = item.shares;
          newShares[action.payload.shareIndex] = action.payload.value;
          return {
            ...item,
            shares: newShares,
            personTotal: newShares.reduce((acc, val) => acc + val)
          };
        }
        return item;
      });
    }
    default:
      return state;
  }
}

function totalsReducer(state: AppState, action: Action): TotalsState {
  if (action.payload == null) {
    return state.totals;
  }
  switch (action.type) {
    case TotalsActions.SET_SUBTOTAL: {
      return { ...state.totals, subtotal: action.payload.value || 0 };
    }
    case TotalsActions.SET_GRAND_TOTAL: {
      return { ...state.totals, grandtotal: action.payload.value || 0 };
    }
    default: {
      return state.totals;
    }
  }
}

function resultReducer(state: AppState, action: Action): ResultState | null {
  switch (action.type) {
    case ResultActions.CALCULATE_RESULT: {
      let personTotal = 0;
      const splits = state.people.map((person, idx) => {
        personTotal += person.personTotal;
        return (
          (person.personTotal / state.totals.subtotal) * state.totals.grandtotal
        );
      });

      if (state.totals.subtotal === 0) {
        Swal({
          text: "Enter a Subtotal!",
          confirmButtonColor: "#70d6ff"
        });
        return state.result;
      }
      if (state.totals.grandtotal === 0) {
        Swal({
          text: "Enter a Grand Total!",
          confirmButtonColor: "#70d6ff"
        });
        return state.result;
      }
      if (personTotal != state.totals.subtotal) {
        Swal({
          text: "Items don't add up to subtotal!",
          confirmButtonColor: "#70d6ff"
        });
        return state.result;
      }
      if (splits.reduce((acc, val) => acc + val) != state.totals.grandtotal) {
        Swal({
          text: "Grand Total incorrect!",
          confirmButtonColor: "#70d6ff"
        });
        return state.result;
      }
      return {
        splits,
        tip: state.totals.grandtotal / state.totals.subtotal - 1
      };
    }
    default: {
      return state.result;
    }
  }
}

export default function reducer(state: AppState, action: Action): AppState {
  return {
    people: peopleReducer(state, action),
    totals: totalsReducer(state, action),
    result: resultReducer(state, action)
  };
}
