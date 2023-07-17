import { ConfirmButton } from "ui-helpers";
import ConfettiExplosion from "react-confetti-explosion";
import { useContext } from "react";
import { StepsContext } from "../../container/StepsContext";
import { useTranslation } from "react-i18next";
export const SuccessSetUp = () => {
  const { updateStepsStatus } = useContext(StepsContext);

  const handleClick = () => {
    updateStepsStatus();
  };

  const { t } = useTranslation();
  return (
    <section className=" h-full w-full space-y-3 overflow-hidden text-center">
      <p className="mb-4 text-9xl">👏</p>
      <h6 className="font-bold">{t("setupaccount.success")}</h6>
      <p>{t("setupaccount.success.message")}</p>
      <ConfirmButton
        text="Top up your account"
        className="w-auto font-normal normal-case"
        onClick={handleClick}
      />

      <ConfettiExplosion
        zIndex={11}
        duration={7000}
        particleCount={250}
        height={3000}
        width={3000}
      />
    </section>
  );
};
