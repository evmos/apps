const ErrorMessage = ({ text }: { text: string }) => {
  return <p className="pl-2 text-xs italic text-red">{text}</p>;
};

export default ErrorMessage;
