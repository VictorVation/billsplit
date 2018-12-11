export enum PersonActions {
  INCREMENT_SHARES = "share.inc",
  DECREMENT_SHARES = "share.dec",
  CHANGE_SHARE_VALUE = "share.change"
}

export enum PeopleActions {
  ADD_PERSON = "person.add",
  REMOVE_PERSON = "person.remove"
}

export enum TotalsActions {
  SET_SUBTOTAL = "subtotal.set",
  SET_GRAND_TOTAL = "grandtotal.set"
}

export enum ResultActions {
  CALCULATE_RESULT = "result.calc"
}

export type Action = {
  type: PeopleActions | TotalsActions | PersonActions | ResultActions;
  payload?: {
    index?: number;
    shareIndex?: number;
    value?: number;
  };
};
