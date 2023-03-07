import { TextField } from "@mui/material";
import React from "react";

interface ICustomTextFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error?: boolean;
  helperText?: string;
}

export default function CustomTextField({ value, onChange, name, label, error, helperText }: ICustomTextFieldProps) {
  return <TextField value={value} name={name} onChange={onChange} fullWidth label={label} helperText={error ? helperText : ""} error={error} />;
}
