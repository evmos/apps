// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cn } from "helpers/src/classnames";
import { IconCheck } from "../../icons/line/basic";

export interface CheckboxProps {
  disabled?: boolean;
  id: string;
  label: JSX.Element | string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  disabled,
  id,
  label,
  checked,
  onChange,
}: CheckboxProps) => (
  <div className="w-full flex gap-2">
    <input
      className={cn(
        " peer relative checked:bg-none appearance-none shrink-0 w-5 h-5 border-1 border-outline-variant dark:border-outline-variant-dark rounded bg-surface-container-lowest dark:bg-surface-container-lowest-dark  hover:bg-on-surface/10 hover:dark:bg-on-surface-dark/10focus:bg-on-surface/10 focus:dark:bg-on-surface-dark/10 checked:bg-primary checked:dark:bg-primary-dark  checked:hover:bg-primary checked:hover:dark:bg-primary-dark checked:focus:bg-primary checked:focus:dark:bg-primary-dark focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-tertiary-container dark:focus:ring-tertiary-container-dark",
        {
          disabled: disabled,
        },
      )}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
    <IconCheck className="absolute p-0.5 w-5 h-5 pointer-events-none hidden peer-checked:block text-on-primary dark:text-on-primary-dark outline-none" />

    <label htmlFor={id}>{label}</label>
  </div>
);
