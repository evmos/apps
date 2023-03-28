import MissionContainer from "../../MissionContainer";

const Container = ({ children }: { children: JSX.Element }) => {
  return (
    <MissionContainer>
      <div className="max-h-72 overflow-y-auto">{children}</div>
    </MissionContainer>
  );
};

export default Container;
