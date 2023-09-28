import { Operation, Descriptions, History } from "../components";
import MainWrapper from "../assets/wrappers/MainWrapper";
import { useAppContext } from "../context/appContext";

const Landing = () => {
  const { userState } = useAppContext();

  return (
    <MainWrapper className="container">
      <Operation />
      {!userState.isAdmin && userState.user && <History />}
      <Descriptions />
    </MainWrapper>
  );
};
export default Landing;
