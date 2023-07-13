import { useTranslation } from "react-i18next";
import { ActionsMetaMask } from "../buttons/ActionsMetaMask";
import { updateCurrentStatus } from "../helpers";
import { GroupStateI, SetUpAccountI } from "../types";

export const SetUpAccount = ({
  stepsSetAccount,
  groupState,
  setGroupState,
}: {
  stepsSetAccount: SetUpAccountI[];
  groupState: GroupStateI[];
  setGroupState: React.Dispatch<React.SetStateAction<GroupStateI[]>>;
}) => {
  const { t } = useTranslation();
  return (
    <section className="space-y-3">
      <h3 className="font-bold">{t("setupaccount.title")}</h3>
      <p className="font-sm text-[#413836]">{t("setupaccount.description")}</p>
      <p className="font-sm text-[#413836]">{t("setupaccount.description2")}</p>
      <nav aria-label="Progress">
        <ol role="list" className="overflow-hidden">
          {stepsSetAccount.map((step, stepIdx) => {
            return (
              <ActionsMetaMask
                key={step.id}
                step={step}
                index={stepIdx}
                length={stepsSetAccount.length}
                statusButton={
                  updateCurrentStatus(groupState, stepIdx)[stepIdx].status
                }
                setGroupState={setGroupState}
              />
            );
          })}
        </ol>
      </nav>
    </section>
  );
};
