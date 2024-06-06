// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { noop, uniqueId } from "lodash-es";
import { ComponentProps, ComponentType, useSyncExternalStore } from "react";
import { PartialBy } from "viem/chains";
import { Button } from "../../button";

export type AlertType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "error";

export interface AlertInstance<
  T extends PromptOption<unknown>[] = PromptOption<unknown>[],
> {
  id: string;
  icon?: ComponentType<ComponentProps<"svg">>;
  type: AlertType;
  priority: number;
  title: React.ReactNode;
  message?: React.ReactNode;
  dismissed: boolean;
  duration: number;
  options: T;
}

type PromptOption<T> = {
  label: React.ReactNode;
  value: T;
  dismiss: boolean;
  buttonProps?: ComponentProps<typeof Button>;
};

type PromptOptionValue<T extends PromptOption<unknown>> = T["value"];

type AlertOptionValue<T extends PromptOption<unknown>[]> = {
  [K in number & keyof T]: PromptOptionValue<T[K]>;
}[number];

type PromptOptionInput = string | PartialBy<PromptOption<unknown>, "dismiss">;

type NormalizedPromptOption<T extends PromptOptionInput> = T extends string
  ? { label: T; value: T; dismiss: boolean }
  : T & { dismiss: boolean };

type PromptOptionsInputList = [PromptOptionInput, ...PromptOptionInput[]];

type NormalizePromptOptionsList<T extends PromptOptionsInputList | undefined> =
  T extends undefined
  ? PromptOption<undefined>[]
  : {
    [K in number & keyof T]: T[K] extends PromptOptionInput
    ? NormalizedPromptOption<T[K]>
    : never;
  }[number & keyof T][];

type AlertArgs<T extends PromptOptionsInputList | undefined = undefined> = {
  type: AlertInstance["type"];
  title: string;
  icon?: ComponentType<ComponentProps<"svg">>;
  message?: React.ReactNode;
  priority?: number;
  duration?: number;
  options?: T;
};

const makePromise = <T,>() => {
  let resolve: (value: T) => void = noop;
  let reject: (value: Error) => void = noop;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  }) as Promise<T> & {
    fulfilled: boolean;
    resolve: (value: T) => void;
    reject: (value: Error) => void;
  };

  promise.resolve = resolve;
  promise.reject = reject;
  promise.fulfilled = false;
  void promise
    .finally(() => {
      promise.fulfilled = true;
    })
    .catch(noop);
  return promise;
};

const DEFAULT_DURATION = 5000;

export class AlertManager extends EventTarget {
  alerts: (AlertInstance & {
    timeout?: NodeJS.Timeout;
    promise: ReturnType<typeof makePromise>;
  })[] = [];

  private get = (id: string) => {
    return this.alerts.find((alert) => alert.id === id);
  };
  private getIndex = (id: string) => {
    return this.alerts.findIndex((alert) => alert.id === id);
  };
  private set = <const T extends PromptOption<unknown>[]>(
    alert: AlertInstance<T>,
  ) => {
    type Option = AlertOptionValue<T>;
    const currentIndex = this.getIndex(alert.id);
    if (currentIndex >= 0) {
      this.dismiss(alert.id);
    }

    const alertToSet = {
      ...alert,
      promise: makePromise<Option>(),
    };
    this.alerts = [...this.alerts];
    if (currentIndex >= 0) {
      this.alerts[currentIndex] = alertToSet;
    } else {
      this.alerts.push(alertToSet);
    }
    const id = alert.id;
    this.scheduleAutoDismiss(id);

    this.emit(id, "alert-created");
    // I need to access `this` from inside the getter, which cannot be done with an arrow function, thus it has it's own scope
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const manager = this;
    type ResolveFn = Option extends undefined
      ? () => void
      : (option: Option) => void;
    const resolveFn = (option: Option) => {
      manager.resolve(id, option);
    };

    const getDonePromise = () => {
      const alert = manager.get(id);
      if (!alert) {
        throw new Error("Alert not found");
      }
      return alert.promise as Promise<Option>;
    };
    return {
      get done() {
        return getDonePromise();
      },
      get dismissed() {
        return getDonePromise().then(noop).catch(noop);
      },

      get isDismissed() {
        const alert = manager.get(id);
        return alert?.dismissed ?? true;
      },

      resolve: resolveFn as ResolveFn,

      reject: () => {
        manager.reject(id);
      },

      update: <const T extends PromptOptionsInputList | undefined>(
        args: Partial<AlertArgs<T>>,
      ) => {
        return manager.update<T>(id, args);
      },
    };
  };
  push = <const T extends PromptOptionsInputList | undefined = undefined>(
    args: AlertArgs<T>,
  ) => {
    const duration =
      args.duration ?? args.options?.length ? Infinity : DEFAULT_DURATION;
    const id = uniqueId("alert-");

    return this.set<NormalizePromptOptionsList<T>>({
      id,
      type: args.type,
      priority: args.priority ?? 1,
      title: args.title,
      message: args.message,
      icon: args.icon,
      dismissed: false,
      duration,
      options: (args.options?.map((option) => {
        if (typeof option === "string") {
          return { label: option, value: option, dismiss: true };
        }
        return {
          ...option,
          dismiss: option.dismiss ?? true,
        };
      }) ?? []) as NormalizePromptOptionsList<T>,
    });
  };

  update = <const T extends PromptOptionsInputList | undefined = undefined>(
    id: string,

    args: Partial<AlertArgs<T>>,
  ) => {
    const duration =
      args.duration ?? args.options?.length ? Infinity : DEFAULT_DURATION;

    const alert = this.get(id);
    if (!alert) throw new Error("Alert not found");
    return this.set<NormalizePromptOptionsList<T>>({
      id,
      type: args.type ?? alert.type,
      priority: args.priority ?? alert.priority,
      title: args.title,
      message: args.message,
      icon: args.icon,
      dismissed: false,
      duration,
      options: (args.options?.map((option) => {
        if (typeof option === "string") {
          return { label: option, value: option, dismiss: true };
        }
        return {
          ...option,
          dismiss: option.dismiss ?? true,
        };
      }) ?? []) as NormalizePromptOptionsList<T>,
    });
  };

  private scheduleAutoDismiss = (id: string) => {
    const alert = this.get(id);
    if (!alert) return;
    if (alert.timeout) clearTimeout(alert.timeout);

    if (alert.duration === Infinity) {
      alert.timeout = undefined;
      return;
    }
    alert.timeout = setTimeout(() => {
      this.dismiss(id);
    }, alert.duration);
  };

  dismiss = (id: string, option?: string) => {
    const alert = this.get(id);
    if (!alert) return;
    const hasOptions = alert.options.length;

    const selectedOption = alert.options.find((o) => o.value === option);
    if (hasOptions && !selectedOption) {
      this.reject(id);
      return;
    }

    this.resolve(id, option);

    this.updateDismissStatus(id);
  };

  resolve = (id: string, option: unknown) => {
    const alert = this.get(id);
    if (!alert) return;
    if (alert.promise.fulfilled) return;

    const selectedOption = alert.options.find((o) => o.value === option);

    if (alert.options.length && !selectedOption)
      throw new Error("Option not found");

    alert.promise.resolve(selectedOption?.value);

    if (selectedOption?.dismiss ?? true) {
      this.updateDismissStatus(id);
    }

    this.emit(id, "alert-accepted");
  };

  reject = (id: string) => {
    const alert = this.get(id);
    if (!alert) return;
    if (alert.promise.fulfilled) return;

    alert.promise.reject(new Error("Alert Rejected"));
    this.updateDismissStatus(id);
    this.emit(id, "alert-rejected");
  };

  private updateDismissStatus = (id: string) => {
    const alert = this.get(id);
    if (!alert) return;
    if (alert.dismissed) return;
    alert.dismissed = true;
    this.alerts = [...this.alerts];
    if (alert.timeout) clearTimeout(alert.timeout);
    this.emit(id, "alert-dismissed");
  };

  emit = (id: string, eventName: string) => {
    const event = new CustomEvent(eventName, {
      detail: {
        id,
      },
    });
    this.dispatchEvent(event);
    this.dispatchEvent(new CustomEvent("alert-update"));
  };

  getAlerts = () => {
    return this.alerts;
  };

  subscribe = (callback: (alerts: AlertInstance[]) => void) => {
    const fn = () => {
      callback(this.getAlerts());
    };
    this.addEventListener("alert-update", fn);
    return () => this.removeEventListener("alert-update", fn);
  };

  //alias for alert types
  success = <const T extends PromptOptionsInputList | undefined>({
    ...rest
  }: Omit<AlertArgs<T>, "type">) => {
    return this.push({ type: "success", ...rest });
  };

  error = <const T extends PromptOptionsInputList | undefined>({
    ...rest
  }: Omit<AlertArgs<T>, "type">) => {
    return this.push({ type: "error", ...rest });
  };

  primary = <const T extends PromptOptionsInputList | undefined>({
    ...rest
  }: Omit<AlertArgs<T>, "type">) => {
    return this.push({ type: "primary", ...rest });
  };

  secondary = <const T extends PromptOptionsInputList | undefined>({
    ...rest
  }: Omit<AlertArgs<T>, "type">) => {
    return this.push({ type: "secondary", ...rest });
  };

  tertiary = <const T extends PromptOptionsInputList | undefined>({
    ...rest
  }: Omit<AlertArgs<T>, "type">) => {
    return this.push({ type: "tertiary", ...rest });
  };

  warning = <const T extends PromptOptionsInputList | undefined>({
    ...rest
  }: Omit<AlertArgs<T>, "type">) => {
    return this.push({ type: "warning", ...rest });
  };
}

export const alertsManager = new AlertManager();

export const useAlerts = () => {
  return [
    useSyncExternalStore(
      alertsManager.subscribe,
      alertsManager.getAlerts,
      alertsManager.getAlerts,
    ),
    alertsManager,
  ] as const;
};
