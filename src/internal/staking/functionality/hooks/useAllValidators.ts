import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getAllValidators, ValidatorsResponse } from "../fetch";
import { ValidatorResponse } from "../types";

export const useAllValidators = () => {
  const validators = useQuery<ValidatorsResponse, Error>({
    queryKey: ["allValidators"],
    queryFn: () => getAllValidators(),
  });

  const allValidators = useMemo(() => {
    let values: ValidatorResponse[] = [];
    if (validators.data !== undefined) {
      values = validators.data.values;
    }
    return values;
  }, [validators]);

  return { validators: allValidators };
};
