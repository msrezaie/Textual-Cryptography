import { Operation, Descriptions, History } from "../components";
import MainWrapper from "../assets/wrappers/MainWrapper";
import { useAppContext } from "../context/appContext";

const Landing = () => {
  const { userName, isAdmin } = useAppContext();

  return (
    <MainWrapper className="container">
      <Operation />
      {!isAdmin && userName && <History />}
      <Descriptions />
    </MainWrapper>
  );
};
export default Landing;
