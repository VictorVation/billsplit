import React, { useState } from "react";
import { default as CurrencyInputImpl } from "react-currency-input";

interface ICurrencyInputProps {
  onChangeEvent: (number) => void;
  value: number;
  name?: string;
  id?: string;
}

export default function CurrencyInput(props: ICurrencyInputProps) {
  const { id, name, value } = props;

  return (
    <div className="col">
      <CurrencyInputImpl
        selectAllOnFocus={true}
        className="col"
        onChangeEvent={(_, __, floatVal) => props.onChangeEvent(floatVal)}
        prefix={"$"}
        value={value}
        name={name ? name : undefined}
        id={id ? id : undefined}
        max={3000}
      />
    </div>
  );
}
