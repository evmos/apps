import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  ComponentProps,
} from "react";
import {
  Address,
  CosmosAddress,
  getPrefix,
  isValidHexAddress,
} from "../../wallet";
import { isValidCosmosAddress } from "../../wallet/utils/addresses/is-valid-cosmos-address";
import { getPrefixes } from "../get-prefixes";
import { isValidRegistryPrefix } from "../is-valid-registry-prefix";
import { Prefix } from "../types";

export type AddressInputErrors = "INVALID_ADDRESS" | "INVALID_PREFIX";
/**
 * This hook is used to facilitate address input handling and validation
 *
 * @example
 * ```tsx
 * function AddressForm() {
 *  const account = useAccount();
 *  const { address, errors, inputProps } = useAddressInput(account.address);
 *  // address = will only be set if the address is valid
 *  return (
 *    <div>
 *      <input {...inputProps} />
 *      {errors?.map((error) => (
 *        <p key={error}>
 *          {error === "INVALID_ADDRESS" && "Invalid address"}
 *          {error === "INVALID_PREFIX" && "Network not supported"}
 *        </p>
 *      ))}
 *    </div>
 *  );
 * ```
 * @example
 * with filtered prefixes
 *
 * ```tsx
 * function AddressForm() {
 *   const account = useAccount();
 *   const { address, errors, inputProps } = useAddressInput(
 *     account.address,
 *     { allowedPrefixes: ["cosmos", "evmos"] }
 *   );
 *   return (
 *    <div>
 *      <input {...inputProps} />
 *      {errors?.map((error) => (
 *        <p key={error}>
 *          {error === "INVALID_ADDRESS" && "Invalid address"}
 *          {error === "INVALID_PREFIX" && "Must be a cosmos or evmos address"}
 *        </p>
 *      ))}
 *  </div>
 * );
 * ```
 */
export const useAddressInput = <TPrefix extends Prefix>(
  initialAddress: string = "",
  config: {
    allowedPrefixes?: TPrefix[];
  } = {}
) => {
  const { allowedPrefixes = [...getPrefixes()] as TPrefix[] } = config;
  const [value, setValue] = useState(initialAddress);
  /**
   * This is for when the initial address takes some time to load
   *
   * if the initial address changes from empty ('') to something else
   * and the value is still empty, use the new initial address value
   */
  useEffect(() => {
    if (initialAddress && value === "") {
      setValue(initialAddress);
    }
  }, [initialAddress]);

  /**
   * this extracts the prefix from the address
   * it does not consider if the prefix is in the allowed prefixes list yet
   * it also does not check if the full address is valid, so it is posssible to extract
   * a prefix from an invalid address
   * ex: "cosmos1ef2" will return "cosmos"
   *
   * It also normalizes hex addresses as being evmos prefixed
   */
  const prefix = useMemo(() => {
    if (value.startsWith("0x")) return "evmos";

    const prefix = getPrefix(value as CosmosAddress);
    if (isValidRegistryPrefix(prefix)) {
      return prefix;
    }
    return null;
  }, [value]);

  /**
   * now we check if the prefix is allowed listed
   */
  const isAllowedPrefix = useMemo(() => {
    if (!prefix) return false;
    return allowedPrefixes.includes(prefix as TPrefix);
  }, [prefix, allowedPrefixes]);

  const errors = useMemo(() => {
    /**
     * if the value is still empty we don't want to show errors
     */
    if (value === "") {
      return [];
    }

    const errors: AddressInputErrors[] = [];

    if (prefix && !isAllowedPrefix) {
      errors.push("INVALID_PREFIX");
    }

    if (!isValidHexAddress(value) && !isValidCosmosAddress(value)) {
      errors.push("INVALID_ADDRESS");
    }

    if (errors.length) {
      return errors;
    }
    return null;
  }, [value, prefix]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const inputProps: ComponentProps<"input"> = {
    type: "text",
    value: value,
    onChange,
  };

  if (errors) {
    return {
      value,
      errors,
      address: undefined,
      setValue,
      inputProps,
      prefix: isAllowedPrefix ? (prefix as TPrefix) : undefined,
    } as const;
  }
  return {
    value,
    errors,
    address: value as Address<TPrefix>,
    setValue,
    inputProps,
    prefix: prefix as TPrefix,
  } as const;
};