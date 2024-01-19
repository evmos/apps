import { getChain } from "../get-chain";

export const getIBCChannelId = ({
  sender,
  receiver,
}: {
  sender: string;
  receiver: string;
}) => {
  const senderChain = getChain(sender);
  const receiverChain = getChain(receiver);

  if (senderChain.prefix !== "evmos") {
    return senderChain.channels.evmos.channelId;
  }
  if (receiverChain.prefix !== "evmos") {
    return receiverChain.channels.evmos.counterpartyChannelId;
  }
  throw new Error(
    `Could not find channel id for ${senderChain.name} -> ${receiverChain.name}`
  );
};
