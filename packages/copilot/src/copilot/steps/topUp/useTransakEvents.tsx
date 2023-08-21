// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEffect } from "react";
import {
  CANCELLED_ORDER_ON_TRANSAK,
  CREATED_ORDER_ON_TRANSAK,
  FAILED_ORDER_ON_TRANSAK,
  SUCCESSFUL_ORDER_ON_TRANSAK,
  useTracker,
} from "tracker";

const ON_RAMP_TYPE = {
  TRANSAK: "transak",
};

type transakParams = {
  event_id?: string;
  data: {
    onRampType: string;
    cryptoAmount: number;
    isBuyOrSell: string;
  };
};

const TRANSAK_EVENTS = {
  TRANSAK_ORDER_FAILED: "TRANSAK_ORDER_FAILED",
  TRANSAK_ORDER_SUCCESSFUL: "TRANSAK_ORDER_SUCCESSFUL",
  TRANSAK_ORDER_CANCELLED: "TRANSAK_ORDER_CANCELLED",
  TRANSAK_ORDER_CREATED: "TRANSAK_ORDER_CREATED",
};
export const useTransakEvents = () => {
  const { handlePreClickAction: createdOrder } = useTracker(
    CREATED_ORDER_ON_TRANSAK
  );
  const { handlePreClickAction: orderSuccessful } = useTracker(
    SUCCESSFUL_ORDER_ON_TRANSAK
  );
  const { handlePreClickAction: orderUnsuccessful } = useTracker(
    FAILED_ORDER_ON_TRANSAK
  );
  const { handlePreClickAction: orderCancelled } = useTracker(
    CANCELLED_ORDER_ON_TRANSAK
  );
  useEffect(() => {
    const handleMessage = ({ data }: { data: transakParams }) => {
      const eventId = data?.event_id;
      const dataEvent = data?.data;
      if (eventId) {
        if (eventId === TRANSAK_EVENTS.TRANSAK_ORDER_CREATED) {
          createdOrder({
            onRampType: ON_RAMP_TYPE.TRANSAK,
            amount: dataEvent?.cryptoAmount,
            transactionType: dataEvent?.isBuyOrSell,
          });
        }
        if (eventId === TRANSAK_EVENTS.TRANSAK_ORDER_SUCCESSFUL) {
          orderSuccessful({
            onRampType: ON_RAMP_TYPE.TRANSAK,
            amount: dataEvent?.cryptoAmount,
            transactionType: dataEvent?.isBuyOrSell,
          });
        }
        if (eventId === TRANSAK_EVENTS.TRANSAK_ORDER_FAILED) {
          orderUnsuccessful({
            onRampType: ON_RAMP_TYPE.TRANSAK,
            amount: dataEvent?.cryptoAmount,
            transactionType: dataEvent?.isBuyOrSell,
          });
        }
        if (eventId === TRANSAK_EVENTS.TRANSAK_ORDER_CANCELLED) {
          orderCancelled({
            onRampType: ON_RAMP_TYPE.TRANSAK,
            amount: dataEvent?.cryptoAmount,
            transactionType: dataEvent?.isBuyOrSell,
          });
        }
      }
    };
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [createdOrder, orderSuccessful, orderUnsuccessful, orderCancelled]);

  return {};
};
