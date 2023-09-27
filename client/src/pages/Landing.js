import { Operation, Descriptions } from "../components";
import MainWrapper from "../assets/wrappers/MainWrapper";

const Landing = () => {
  return (
    <MainWrapper className="container">
      <Operation />
      <Descriptions />
    </MainWrapper>
  );
};
export default Landing;
