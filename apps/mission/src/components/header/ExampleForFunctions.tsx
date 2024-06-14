"use client";
import { useWallet } from "@evmosapps/evmos-wallet";
import { AddressDisplay } from "@evmosapps/ui-helpers";
import { createMessage, hasProfile } from "../../app/api/testAuth/auth";

import { useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";

export const ExampleForFunctions = () => {
  const { address } = useWallet();
  const { signMessageAsync } = useSignMessage();
  const handleClick = async () => {
    if (address) {
      await hasProfile(address);

      try {
        // use it with the server - gives an error
        // const message = await createMessage({
        //   address,
        //   domain: window.location.host,
        //   uri: window.location.origin,
        // });

        // using directly in the client
        const message = new SiweMessage({
          domain: window.location.host,
          address: address,
          statement: "Sign in with Ethereum to the app. ",
          uri: window.location.origin,
          version: "1",
          // check how to get the chainId, and if it should be a specific value or can it change.
          chainId: 1,
          // decide if we want to use CSRF for nonce
          // should we get it from the database ?
          //   nonce: "1",
        });
        console.log(message);
        const signature = await signMessageAsync({
          message: message.prepareMessage(),
        });
        console.log(signature);
      } catch (e) {
        console.log(e);
        return e;
      }

      //   const message = await createMessage(
      //     address,
      //     "localhost:3000",
      //     "http://localhost:3000",
      //   );

      // create message that has to be signed
      // receive the signature and address and verify
      // if that's correct -> create and return JWT
    } else {
      alert("No address found");
      // we should create a profile here.
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-primary opacity-80 rounded p-1 text-white"
    >
      Test <AddressDisplay address={address} />
    </button>
  );
};
