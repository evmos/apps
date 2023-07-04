export const Badge = ({ text, style }: { text: string; style?: string }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] ring-1 ring-inset  ${
        style ?? "text-[#15803D] ring-[#C4EBD2]"
      }`}
    >
      {text}
    </span>
  );
};
