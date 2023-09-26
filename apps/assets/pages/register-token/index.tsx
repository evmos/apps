import {
  RegisterERC20Proposal,
  RegisterCoinProposal,
} from "@buf/evmos_evmos.bufbuild_es/evmos/erc20/v1/erc20_pb";
import { useMutation } from "@tanstack/react-query";
import {
  executeProtoTransaction,
  prepareProtoTransaction,
} from "evmos-wallet/src/registry-actions/transfers/prepare-any-proto-transaction";
import { MsgSubmitProposal } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/gov/v1beta1/tx_pb";

import { serialize, useAccount } from "wagmi";

import { ethToEvmos } from "evmos-wallet";

export default function RegisterToken() {
  return (
    <div className="text-white">
      <h1>Register Token</h1>
      <RegisterERC20ProposalForm />
    </div>
  );
}

const RegisterERC20ProposalForm = () => {
  const { address } = useAccount();
  const { mutate, isLoading, data } = useMutation({
    mutationKey: ["register-erc20-proposal"],
    mutationFn: ({
      title,
      description,
      erc20address,
    }: {
      title: string;
      description: string;
      erc20address: string;
    }) => {
      if (!address) {
        throw new Error("No address");
      }
      // const msg = new RegisterERC20Proposal({
      //   title,
      //   description,
      //   erc20addresses: [erc20address],
      // });
      const msg = new RegisterCoinProposal({
        title: "Register Osmosis channel-1653 Token Pair",
        description:
          "This proposal creates and registers an ERC20 representation for Osmosis.",
        metadata: [
          {
            description:
              "The native staking and governance token of the Osmosis chain.",
            denomUnits: [
              {
                denom:
                  "ibc/2FBDAF744D3750564479C8E014CCD9522D59A264288E79644D139AE3203A9A71",
                exponent: 0,
                aliases: ["uosmo"],
              },
              { denom: "osmo", exponent: 6, aliases: [] },
            ],
            base: "ibc/2FBDAF744D3750564479C8E014CCD9522D59A264288E79644D139AE3203A9A71",
            display: "osmo",
            name: "Osmosis channel-1653",
            symbol: "OSMO",
            uri: "",
            uriHash: "",
          },
        ],
      });
      return executeProtoTransaction({
        sender: ethToEvmos(address),
        messages: [
          new MsgSubmitProposal({
            content: {
              typeUrl: "/" + RegisterCoinProposal.typeName,
              value: msg.toBinary(),
            },

            proposer: ethToEvmos(address),
            initialDeposit: [
              {
                amount: "100000000",
                denom: "atevmos",
              },
            ],
          }),
        ],
        mode: "DIRECT",
        fee: {
          gasLimit: 3000000n,
          token: {
            amount: 22000000000000000n,
            ref: "evmos:EVMOS",
          },
        },
      });
    },
  });

  return (
    <form
      className="text-white flex flex-col space-y-2"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const erc20address = formData.get("erc20addresses") as string;

        mutate({
          title,
          description,
          erc20address,
        });
      }}
    >
      <h1>Register ERC20 Proposal</h1>
      <label>
        Title
        <input
          className="text-black w-full"
          type="text"
          name="title"
          value="Register WIZZ ERC20 for dashboard tests"
        />
      </label>
      <label>
        Description
        <input
          className="text-black w-full"
          type="text"
          name="description"
          value="Registering Token to be used in app.evmos.org tests, please, vote yes"
        />
      </label>
      <label>
        ERC20 Addresses
        <input
          className="text-black w-full"
          type="text"
          name="erc20addresses"
          value="0xcf4e2cae6193f943c8f39b6012b735cad37d8f4a"
        />
      </label>
      <button type="submit">Submit</button>

      {isLoading && <div>Loading...</div>}
      {data && <pre>{serialize(data, null, 2)}</pre>}
    </form>
  );
};

// evmosd tx gov submit-legacy-proposal register-erc20 0xcf4e2cae6193f943c8f39b6012b735cad37d8f4a \
// --from evmos1dcx5nwsuqme9w3pmc22tnyygs6z8w5qdjueley \
// --title "Register WIZZ ERC20 for dashboard tests" \
// --description "Registering Token to be used in app.evmos.org tests, please, vote yes" --chain-id evmos_9000-4 --deposit 100000000atevmos \
// --fees 22000000000000000atevmos \
// --node https://tendermint.bd.evmos.dev:26657 \
// --gas 604909
