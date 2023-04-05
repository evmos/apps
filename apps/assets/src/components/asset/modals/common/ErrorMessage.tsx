const ErrorMessage = ({ text }: { text: string }) => {
  return <span className="text-red text-xs italic pl-2">{text}</span>;
};

export default ErrorMessage;
