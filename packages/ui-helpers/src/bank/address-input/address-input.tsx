import { ComponentProps, useEffect } from "react";
import { cn } from "helpers";
import { AddressInputErrors, useAddressInput } from "./use-address-input";

export const AddressInput = ({
  value,
  onChange,
  className,
  allowedPrefixes,
  errorClassName,
  renderErrors = (errors, allowedPrefixes) =>
    errors.map((error) => (
      <p className={errorClassName} key={error}>
        {error === "INVALID_ADDRESS" && "Invalid address"}
        {error === "INVALID_PREFIX" && allowedPrefixes && (
          <>
            This address is not valid for the selected Network, your address The
            expected address should be similar to this:
            <span className="font-bold">
              {allowedPrefixes.map((prefix) => `${prefix}1...`).join(", ")}
            </span>
          </>
        )}
      </p>
    )),
  ...props
}: Omit<ComponentProps<"input">, "value" | "onChange"> & {
  value?: string;
  allowedPrefixes?: string[];
  onChange?: (address: string) => void;
  renderErrors?: (
    errors: AddressInputErrors[],
    allowedPrefixes?: string[]
  ) => React.ReactNode;
  errorClassName?: string;
}) => {
  const { address, errors, inputProps } = useAddressInput(
    value,
    allowedPrefixes
  );

  useEffect(() => {
    if (address !== value) {
      onChange?.(address ?? "");
    }
  }, [address]);

  return (
    <>
      <input
        className={cn(
          "w-full font-bold border-none py-3 px-4 text-sm leading-5 text-gray-900 focus:ring-1 rounded",
          className
        )}
        type="text"
        placeholder="address"
        value={value}
        {...inputProps}
        {...props}
      />
      {errors && renderErrors(errors, allowedPrefixes)}
    </>
  );
};
