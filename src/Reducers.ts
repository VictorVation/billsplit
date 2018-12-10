import { AppState, PeopleState, TotalsState } from "./State";
import { PeopleActions, TotalsActions, PersonActions, Action } from "./Actions";

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
  if (action.payload == null) {
    return state;
  }
  switch (action.type) {
    case PersonActions.INCREMENT_SHARES: {
      if (state[action.payload].shares.length === 9) {
        return state;
      }
      return state.map((item, idx) => {
        if (idx === action.payload) {
          return { ...item, shares: [...item.shares, 0] };
        }
        return item;
      });
    }
    case PersonActions.DECREMENT_SHARES: {
      if (state[action.payload].shares.length === 1) {
        return state;
      }
      return state.map((item, idx) => {
        if (idx === action.payload) {
          return { ...item, shares: item.shares.slice(0, -1) };
        }
        return item;
      });
    }
    case PersonActions.CHANGE_SHARE_VALUE: {
      return state.map((item, idx) => {
        if (idx === action.payload) {
          return {
            ...item,
            personTotal: item.shares.reduce((acc, val) => acc + val)
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
      return { ...state.totals, subtotal: action.payload };
    }
    case TotalsActions.SET_GRAND_TOTAL: {
      return { ...state.totals, grandtotal: action.payload };
    }
    default: {
      return state.totals;
    }
  }
}

function resultReducer(state: AppState, action: Action): TotalsState {
  if (action.payload == null) {
    return state.totals;
  }
  switch (action.type) {
    case TotalsActions.SET_SUBTOTAL: {
      return { ...state.totals, subtotal: action.payload };
    }
    case TotalsActions.SET_GRAND_TOTAL: {
      return { ...state.totals, grandtotal: action.payload };
    }
    default: {
      return state.totals;
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
