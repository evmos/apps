// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, SetStateAction, useCallback } from "react";
import RadioElement from "../../../common/radioGroups/RadioElement";

const RadioElementContainer = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(event.target.value);
    },
    [setSelected],
  );
  return (
    <div>
      <RadioElement
        text="Yes"
        selected={selected}
        onChange={handleChange}
        name="votes"
      />
      <RadioElement
        text="No"
        selected={selected}
        onChange={handleChange}
        name="votes"
      />
      <RadioElement
        text="No with Veto"
        selected={selected}
        onChange={handleChange}
        name="votes"
      />
      <RadioElement
        text="Abstain"
        selected={selected}
        onChange={handleChange}
        name="votes"
      />
    </div>
  );
};

export default RadioElementContainer;
