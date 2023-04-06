const ErrorMessage = ({ text }: { text: string }) => {
  return <p className="text-red text-xs italic pl-2">{text}</p>;
};

export default ErrorMessage;
