// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  ComponentProps,
  ComponentType,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import { cn } from "helpers";
import { IconButton } from "../../button/icon-button";
import { IconBarchart, IconCross } from "../../icons/line/basic";
import React from "react";
import { AlertType } from "./alert-manager";
export * from "./alert-manager";

export function _Alert(
  {
    dismiss,
    className,
    children,
    variant = "primary",
    compact,
    ...rest
  }: ComponentProps<"div"> & {
    dismiss?: () => void;
    variant?: AlertType;
    compact?: boolean;
  },
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const colors = {
    "border-primary-container dark:border-primary-container-dark bg-primary-container/10 dark:bg-primary-container-dark/10 [&_.alert-header]:text-on-primary-container [&_.alert-header]:dark:text-on-primary-container-dark":
      variant === "primary",

    "border-secondary-container dark:border-secondary-container-dark bg-secondary-container/10 dark:bg-secondary-container-dark/10 [&_.alert-header]:text-on-secondary-container [&_.alert-header]:dark:text-on-secondary-container-dark":
      variant === "secondary",
    "border-tertiary-container dark:border-tertiary-container-dark bg-tertiary-container/10 dark:bg-tertiary-container-dark/10 [&_.alert-header]:text-on-tertiary-container [&_.alert-header]:dark:text-on-tertiary-container-dark":
      variant === "tertiary",

    "border-success-container dark:border-success-container-dark bg-success-container/10 dark:bg-success-container-dark/10 [&_.alert-header]:text-on-success-container [&_.alert-header]:dark:text-on-success-container-dark":
      variant === "success",

    "border-warning-container dark:border-warning-container-dark bg-warning-container/10 dark:bg-warning-container-dark/10 [&_.alert-header]:text-on-warning-container [&_.alert-header]:dark:text-on-warning-container-dark":
      variant === "warning",

    "border-error-container dark:border-error-container-dark bg-error-container/10 dark:bg-error-container-dark/10 [&_.alert-header]:text-on-error-container [&_.alert-header]:dark:text-on-error-container-dark":
      variant === "error",
  };
  return (
    <div
      ref={ref}
      className={cn(
        "border rounded-lg backdrop-blur-lg p-4 px-12 flex gap-x-4 transition-colors duration-400",
        {
          "alert-compact flex-row items-center": compact,
          "flex-col": !compact,
        },
        colors,
        className,
      )}
      {...rest}
    >
      {React.Children.toArray(children).map((child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            variant,
          } as {});
        }
        return child;
      })}

      <IconButton
        className="absolute top-3 right-3"
        size="sm"
        onClick={dismiss}
        variant="primary"
        ghost
      >
        <IconCross />
      </IconButton>
    </div>
  );
}

function AlertHeader({
  className,
  icon = IconBarchart,
  children,
  ...rest
}: ComponentProps<"header"> & {
  icon?: ComponentType<ComponentProps<"svg">>;
  variant?: AlertType;
}) {
  const Icon = icon;
  return (
    <header
      className={cn("alert-header relative flex items-center", className)}
      {...rest}
    >
      {Icon && (
        <div
          className={cn(
            "absolute -left-7",
            "before:rounded-full before:aspect-square w-4 h-4",
            "before:opacity-10 before:bg-current",
            "before:absolute before:h-6 before:block before:-left-1  before:-top-1",
            "before:outline before:outline-offset-2 before:current before:outline-current",
          )}
        >
          <Icon className="w-4 h-4 relative" />
        </div>
      )}
      <h2 className="overflow-hidden">{children}</h2>
    </header>
  );
}

function AlertBody({ className, children, ...rest }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-subheading dark:text-subheading-dark text-base",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

function AlertActions({ className, children, ...rest }: ComponentProps<"div">) {
  return (
    <div className={cn("mt-2 [.alert-compact_&]:mt-0", className)} {...rest}>
      {children}
    </div>
  );
}

type ForwardedComponent<T> =
  T extends ForwardRefRenderFunction<infer U, infer P>
    ? ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<U>>
    : never;

export const Alert = React.forwardRef(_Alert) as ForwardedComponent<
  typeof _Alert
> & {
  Header: typeof AlertHeader;
  Body: typeof AlertBody;
  Actions: typeof AlertActions;
};

Alert.Header = AlertHeader;
Alert.Body = AlertBody;
Alert.Actions = AlertActions;
