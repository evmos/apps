import { ModalTitle } from "ui-helpers";
import React, { useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatNumber } from "helpers";
import {
  DEFAULT_FORM_VALUES,
  PlansType,
  dummyProps,
  getEndDate,
  plans,
  schema,
  setVestingAccountNameLocalstorage,
  vestingSettingsConfig,
} from "../helpers";

export const CreateAccountModal = () => {
  const handleOnClick = (d: FieldValues) => {
    // TODO: logic for create account modal
    if (d.accountName !== "") {
      setVestingAccountNameLocalstorage(d.accountName);
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const selectedPlanType: PlansType = watch("planType");
  const selectedStartDate = watch("startDate");
  const selectedVestingDuration = watch("vestingDuration");

  const endDate = useMemo(() => {
    return getEndDate(selectedStartDate, selectedVestingDuration);
  }, [selectedStartDate, selectedVestingDuration]);

  const planTypeRegister = register("planType");
  return (
    <div className="space-y-5">
      <ModalTitle title="Create Vesting Account" />

      <form
        onSubmit={handleSubmit((d) => {
          console.log(d);
          handleOnClick(d);
        })}
        className="flex flex-col space-y-3"
      >
        <label htmlFor="planType" className="text-xs font-bold">
          PLAN TYPE
        </label>
        <select
          id="planType"
          {...planTypeRegister}
          onChange={(e) => {
            const planType = e.target.value as "Team" | "Grantee" | "Custom";
            planTypeRegister.onChange(e); // method from hook form register
            setValue(
              "vestingDuration",
              vestingSettingsConfig[planType].duration[0]
            );
            setValue("vestingCliff", vestingSettingsConfig[planType].cliff[0]);
            setValue(
              "vestingSchedule",
              vestingSettingsConfig[planType].schedule[0]
            );
            setValue(
              "lockupDuration",
              vestingSettingsConfig[planType].lockup[0]
            );
          }}
        >
          {plans.map((elt) => (
            <option key={elt} value={elt}>
              {elt}
            </option>
          ))}
        </select>

        <div className="flex items-center justify-between space-x-2">
          <div className="flex flex-grow flex-col space-y-2">
            <label htmlFor="vestingDuration" className="text-xs font-bold">
              VESTING DURATION
            </label>

            <select
              id="vestingDuration"
              {...register("vestingDuration")}
              disabled={vestingSettingsConfig[selectedPlanType]?.disabled}
              value={selectedVestingDuration}
            >
              {vestingSettingsConfig[selectedPlanType]?.duration.map((elt) => (
                <option key={elt} value={elt}>
                  {elt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-grow flex-col space-y-2">
            <label htmlFor="vestingCliff" className="text-xs font-bold">
              VESTING CLIFF
            </label>

            <select
              id="vestingCliff"
              {...register("vestingCliff")}
              disabled={vestingSettingsConfig[selectedPlanType]?.disabled}
            >
              {vestingSettingsConfig[selectedPlanType]?.cliff.map((elt) => (
                <option key={elt} value={elt}>
                  {elt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between space-x-2">
          <div className="flex flex-grow flex-col space-y-2">
            <label htmlFor="vestingSchedule" className="text-xs font-bold">
              VESTING SCHEDULE
            </label>

            <select
              id="vestingSchedule"
              {...register("vestingSchedule")}
              disabled={vestingSettingsConfig[selectedPlanType]?.disabled}
            >
              {vestingSettingsConfig[selectedPlanType]?.schedule.map((elt) => (
                <option key={elt} value={elt}>
                  {elt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-grow flex-col space-y-2">
            <label htmlFor="lockupDuration" className="text-xs font-bold">
              LOCKUP DURATION
            </label>

            <select
              id="lockupDuration"
              {...register("lockupDuration")}
              disabled={vestingSettingsConfig[selectedPlanType]?.disabled}
            >
              {vestingSettingsConfig[selectedPlanType]?.lockup.map((elt) => (
                <option key={elt} value={elt}>
                  {elt}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="startDate" className="text-xs font-bold">
            START DATE
          </label>
          <div className="text-right text-[10px]">
            {endDate !== undefined && endDate[0] && (
              <p>END DATE: {endDate[1]}</p>
            )}
            <p>(i) The start time will default to 0:00 UTC</p>
          </div>
        </div>
        <input id="startDate" type="date" {...register("startDate")} />
        {errors.startDate?.message && (
          <span className="text-xs text-red">
            {errors.startDate.message.toString()}
          </span>
        )}

        <label htmlFor="address" className="text-xs font-bold">
          ADDRESS
        </label>
        <input id="address" {...register("address")} />
        {errors.address?.message && (
          <span className="text-xs text-red">
            {errors.address.message.toString()}
          </span>
        )}

        <label
          htmlFor="accountName"
          className="v flex justify-between text-xs font-bold"
        >
          ACCOUNT NAME
        </label>
        <input id="accountName" {...register("accountName")} />
        {errors.accountName?.message && (
          <span className="text-xs text-red">
            {errors.accountName.message.toString()}
          </span>
        )}

        <label htmlFor="amount" className="flex justify-between text-xs ">
          <span className="font-bold">AMOUNT</span>
          <span>Available: {formatNumber(dummyProps.available)} EVMOS</span>
        </label>
        <input
          type="number"
          id="amount"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount?.message && (
          <span className="text-xs text-red">
            {errors.amount.message.toString()}
          </span>
        )}

        <input
          type="submit"
          style={{ backgroundColor: "#ed4e33" }}
          className="w-full cursor-pointer rounded p-2 font-[GreyCliff] text-lg font-bold uppercase text-pearl"
          value="Create"
        />
      </form>
    </div>
  );
};
