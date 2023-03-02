import { useEffect, useState } from "react";

export const Countdown = ({ epochs }: { epochs: number | string }) => {
  const [partyTime, setPartyTime] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date(epochs);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (h <= 0 && m <= 0 && s <= 0) {
        setPartyTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [epochs]);

  if (typeof epochs === "string") {
    return <p>{epochs}</p>;
  }

  return (
    <div>
      {partyTime ? (
        <p>Reward Time!</p>
      ) : (
        <span>
          {hours}H {minutes}M {seconds}S
        </span>
      )}
    </div>
  );
};
