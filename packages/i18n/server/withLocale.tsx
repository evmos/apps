import { setLocale } from "./locale";

type Params = {
  params: {
    locale: string;
  };
};

export const withLocale =
  (C: (props: Params) => React.ReactNode) => (props: Params) => {
    setLocale(props.params.locale);
    return <C {...props} />;
  };
