"use client";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { DApp } from "../../../lib/fetch-explorer-data";
import { IconLightning } from "@evmosapps/ui/icons/line/images/lightning.tsx";
export const Title = ({
  categories,
  params,
  //   setIsChecked,
  //   isChecked,
}: {
  categories: DApp[];
  params: { category?: string; dapp?: string };
  //   setIsChecked: Dispatch<SetStateAction<boolean>>;
  //   isChecked: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const selectedCategory = useMemo(() => {
    return categories?.find((category) => category.slug === params.category);
  }, [categories, params.category]);

  return (
    <div className="pt-14 flex justify-between">
      <p className="text-heading dark:text-heading-dark text-xl font-medium">
        {selectedCategory?.name ?? "dApps"}
        <span className="text-subheading dark:text-subheading-dark font-medium text-sm pl-2">
          {selectedCategory?.categoryDapps.length} results
        </span>
      </p>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);
            }}
          />
          <div className="flex items-center space-x-1">
            <IconLightning className="h-3 w-3 text-primary-container dark:text-primary-container-dark" />
            <p className="text-primary dark:text-primary-dark text-sm ">
              Instant
            </p>
          </div>
        </div>
        <div>Dropdown</div>
      </div>
    </div>
  );
};
