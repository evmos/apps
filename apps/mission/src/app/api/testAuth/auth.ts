"use server";

import { SiweMessage } from "siwe";

const dummyProfile = [
  {
    displayName: "John Doe",
    address: "0xaF3219826Cb708463B3AA3B73c6640A21497AE49",
    img: {
      src: "https://example.com/image.jpg",
    },
  },
];

// how should be the structure of the response ?/*
/** Check if a user has a profile created or not
 * @param address
 * @returns message: string, result: boolean
 * @example
 */
export async function hasProfile(address: string) {
  // should we check the JWT here?
  // I think that in this step we don't have the JWT created yet, right?
  await new Promise((resolve) => setTimeout(resolve, 1000));

  //  here we should call the method that Julia is going to create for reading the db
  const isProfileActive = dummyProfile.find(
    (profile) => profile.address === address,
  );

  if (isProfileActive) {
    return { message: "User has a profile created !", result: true };
  }
  return { message: "User has not a profile created!", result: false };
}

type SIWEMESSAGE = {
  address: string;
  domain: string;
  uri: string;
};

export async function createMessage({ address, domain, uri }: SIWEMESSAGE) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const message = new SiweMessage({
    domain: domain,
    address: address,
    statement: "Sign in with Ethereum to the app.",
    uri: uri,
    version: "1",
    // check how to get the chainId, and if it should be a specific value or can it change.
    chainId: 1,
    // decide if we want to use CSRF for nonce
    // should we get it from the database ?
    //   nonce: "1",
  });

  //   if I return it like this, it gives you an error related to server/client components
  return message;
}
