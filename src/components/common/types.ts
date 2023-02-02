export type ConfirmButtonProps = {
  text: string | JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
};
