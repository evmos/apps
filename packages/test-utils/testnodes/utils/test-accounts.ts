import { mnemonicToAccount } from "viem/accounts";

const makeAccount = (key: string, mneumonic: string) => {
  const { address, publicKey } = mnemonicToAccount(mneumonic);

  return {
    key,
    mneumonic,
    hexAddress: address,

    publicKey,
  };
};

export const TEST_ACCOUNTS = {
  thevalidator: {
    ...makeAccount(
      "thevalidator",
      "diagram project skill soon visual achieve canvas tiger orchard away appear print thrive glow gravity pluck speed seven february fame beef core frown where"
    ),

    initialBalance: 100000000000000000000000000000000n,
  },
  therich: {
    ...makeAccount(
      "therich",
      "reward crack sample fox open play pencil power hour index virtual fiction square fire nose decorate daring noise below fashion idle two regular absurd"
    ),
    initialBalance: 100000000000000000000000000000000n,
  },
  thepoor: {
    ...makeAccount(
      "thepoor",
      "cabbage mention nuclear book across secret enforce photo dust recipe bicycle mercy laugh put cram online critic escape pluck blade boy noise beyond axis"
    ),
    initialBalance: 10n,
  },

  theaverage: {
    ...makeAccount(
      "theaverage",
      "grow velvet flower chief century group another lake aunt struggle physical dilemma position else target whale senior gym box pulp then humor they favorite"
    ),

    initialBalance: 1234593857763n,
  },

  ci: {
    ...makeAccount(
      "ci",
      "hour real shaft torch panda palm settle hand stamp ridge gate corn"
    ),
    initialBalance: 100000000000000000000000000000000n,
  },
  relayer: {
    ...makeAccount(
      "relayer",
      "flush affair switch actual monkey guilt flip excuse luxury spike deputy outside business wood reward thunder trust system echo abuse fantasy derive gorilla design"
    ),
    initialBalance: 100000000000000000000000000000000n,
  },
};
