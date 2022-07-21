import React from "react";

export default function RadioButton({
  checked,
  onChange,
  label,
  className,
  radioClassName,
}) {
  return (
    <div className={`group ${className}`}>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className={`h-4 w-4 ${
          radioClassName ?? "text-indigo-600"
        } border-gray-300 focus:ring-0`}
      />
      <span className="label pl-2">{label}</span>
    </div>
  );
}
