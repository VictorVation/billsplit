import React, { ReactNode, ReactNodeArray } from "react";

import Ink from "react-ink";

interface IInkButtonProps {
  children?: ReactNode | ReactNodeArray;
  disabled?: boolean;
  disableInk?: boolean;
  onClick?: (any) => void;
  className?: string;
  type?: string;
}

export default function InkButton({
  children,
  className,
  onClick,
  type,
  disabled,
  disableInk
}: IInkButtonProps) {
  return (
    <button
      onClick={onClick != null ? onClick : undefined}
      className={className != null ? className : undefined}
      disabled={disabled != null ? disabled : undefined}
      type={type != null ? type : undefined}
    >
      {children}
      {!disableInk && <Ink />}
    </button>
  );
}
