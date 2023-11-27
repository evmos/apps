"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import React from "react";
import { RequestModalProps } from "./RequestModal";

import { ShareContent } from "./ShareContent";
import { SetUpContent } from "./SetupContent";
import { ReceiveContent } from "./ReceiveContent";

export const Content = ({
  token,
  amount,
  setState,
  step,
}: RequestModalProps) => {
  const [message, setMessage] = React.useState("");

  return (
    <section className="space-y-3">
      {step === "share" && (
        <ShareContent
          setState={setState}
          message={message}
          amount={amount}
          token={token}
        />
      )}
      {step === "setup" && (
        <SetUpContent
          setState={setState}
          setMessage={setMessage}
          message={message}
          amount={amount}
          token={token}
        />
      )}
      {step === "receive" && <ReceiveContent setState={setState} />}
    </section>
  );
};
