// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { ComponentProps } from "react";
import { Button } from "../../button";
import React from "react";
import { Transition } from "@headlessui/react";
import { Alert } from ".";
import { useAlerts } from "./alert-manager";

export function AlertStack({}: ComponentProps<"div">) {
  const [alerts, manager] = useAlerts();

  return (
    <div className="gap-2 flex flex-col fixed bottom-8 pointer-events-none px-4 max-w-md w-full left-1/2 -translate-x-1/2">
      {alerts.map((alert) => {
        return (
          <Transition
            appear={true}
            key={alert.id}
            show={!alert.dismissed}
            enter="transition-[max-height,transform] duration-[400ms]"
            enterFrom="max-h-0 scale-95"
            enterTo="rotate-0 scale-100 mb-0 max-h-48"
            leave="transition-[max-height,transform] duration-[400ms]"
            leaveFrom="scale-100 max-h-48"
            leaveTo="scale-95  max-h-0"
          >
            <Alert
              className="pointer-events-auto"
              dismiss={() => manager.dismiss(alert.id)}
              variant={alert.type}
            >
              <Alert.Header icon={alert.icon}>{alert.title}</Alert.Header>

              <Alert.Body>{alert.message}</Alert.Body>

              {!!alert.options.length && (
                <Alert.Actions>
                  {alert.options?.map(
                    ({ value, label, buttonProps = {} }, i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant={alert.type}
                        onClick={() => {
                          manager.resolve(alert.id, value);
                        }}
                        {...buttonProps}
                      >
                        {label}
                      </Button>
                    ),
                  )}
                </Alert.Actions>
              )}
            </Alert>
          </Transition>
        );
      })}
    </div>
  );
}
