export const getRemainingTime = (date: string) => {
  const target = new Date(date);
  const now = new Date();
  const difference = target.getTime() - now.getTime();

  const d = Math.floor(difference / (1000 * 60 * 60 * 24));
  const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <>
      {d}D {h}H {m}M ({target.getUTCMonth() + 1}/{target.getUTCDate()}/
      {target.getUTCFullYear()})
    </>
  );
};
