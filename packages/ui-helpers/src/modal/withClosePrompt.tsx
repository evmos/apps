import { ModalProps } from "helpers";
import { ClosePromptContext, CloseModal } from "./CloseModal";

export const withClosePrompt = <T extends ModalProps>(
  Component: (props: T) => React.ReactElement
) => {
  return (props: T) => {
    const [isOpen, setIsOpen] = useState(false);

    const promptClose = (isOpen: boolean) => {
      setIsOpen(isOpen);
    };

    return (
      <ClosePromptContext.Provider value={{ promptClose }}>
        {isOpen && (
          <CloseModal
            handleAccept={() => {
              promptClose(false);
            }}
            handleReject={() => {
              window.close();
            }}
            title="Are you sure you want to exit?"
            description="You will lose your progress if you exit now."
          />
        )}
        <Component {...props} />
      </ClosePromptContext.Provider>
    );
  };
};
