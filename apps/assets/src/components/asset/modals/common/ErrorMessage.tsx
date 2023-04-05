const ErrorMessage = ({ text }: { text: string }) => {
  return <span className="pl-2 text-xs italic text-red">{text}</span>;
};

export default ErrorMessage;
