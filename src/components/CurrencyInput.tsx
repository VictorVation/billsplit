import React, { useState } from "react";
import mask from "../mask";

interface ICurrencyInputProps {
  onChangeEvent: (number) => void;
  value: number;
  name?: string;
  id?: string;
}

type CurrencyInputState = {
  value: number;
  maskedValue: string;
};

export default function CurrencyInput(props: ICurrencyInputProps) {
  const { id, name, onChangeEvent, value } = props;
  const [state, setState] = useState<CurrencyInputState>(mask(value));

  const handleChange = event => {
    event.preventDefault();
    let { maskedValue, value } = mask(event.currentTarget.value);
    setState({ maskedValue, value });
    onChangeEvent(value);
  };

  return (
    <div className="col">
      <input
        // selectAllOnFocus={true}
        key={name}
        className="col"
        // onChangeEvent={(_, __, floatVal) => floatVal}
        // onChange={event => onChangeEvent(event.currentTarget.value)}
        onChange={handleChange}
        prefix={"$"}
        value={state.maskedValue}
        name={name ? name : undefined}
        id={id ? id : undefined}
      />
    </div>
  );
}
