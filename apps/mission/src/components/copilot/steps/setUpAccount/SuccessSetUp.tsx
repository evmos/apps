import { ConfirmButton } from "ui-helpers";
import ConfettiExplosion from "react-confetti-explosion";
export const SuccessSetUp = () => {
  return (
    <section className=" h-full w-full space-y-3 overflow-hidden text-center">
      <p className="mb-4 text-9xl">👏</p>
      <h6 className="font-bold">Congratulations!</h6>
      <p>Your account has been set up successfully!</p>
      <ConfirmButton
        text="Top up your account"
        className="w-auto font-normal normal-case"
        onClick={() => {}}
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
