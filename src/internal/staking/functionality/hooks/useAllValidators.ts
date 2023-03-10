import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getAllValidators, ValidatorsResponse } from "../fetch";
import { ValidatorResponse, ValidatorsList } from "../types";
import { useStakingInfo } from "./useStakingInfo";

export const useAllValidators = () => {
  const validators = useQuery<ValidatorsResponse, Error>({
    queryKey: ["allValidators"],
    queryFn: () => getAllValidators(),
  });
  const { delegations } = useStakingInfo();
  const allValidators = useMemo(() => {
    const validatorWithDelegations: ValidatorsList[] = [];
    let values: ValidatorResponse[] = [];
    if (validators.data !== undefined) {
      values = validators.data.values;
      values?.map((item) => {
        validatorWithDelegations.push({
          validator: item,
          balance: { balance: { amount: "", denom: "" } },
        });
      });
      delegations.map((item) => {
        validatorWithDelegations.filter((i) => {
          if (i.validator.rank === item.delegation.validator.rank) {
            i.balance.balance.amount = item.balance.amount;
          }
        });
      });
    }

    return validatorWithDelegations;
  }, [validators, delegations]);

  return { validators: allValidators };
};
