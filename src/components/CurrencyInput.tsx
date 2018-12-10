import React, { useState } from "react";
import { Person } from "../State";
import { default as CurrencyInputImpl } from "react-currency-input";

interface ICurrencyInputProps {
  onChangeEvent: (number) => void;
  value: number;
  name?: string;
}

export default function CurrencyInput(props: ICurrencyInputProps) {
  const { name, value } = props;
  const [val, setVal] = useState(value);

  return (
    <div className="col">
      <CurrencyInputImpl
        selectAllOnFocus={true}
        className="col"
        onChangeEvent={(event, maskVal, floatVal) => {
          console.log(event, maskVal, floatVal);
        }}
        prefix={"$"}
        value={val}
        name={name ? name : undefined}
      />
    </div>
  );
}
