import { Operation, Descriptions, History } from "../components";
import MainWrapper from "../assets/wrappers/MainWrapper";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";

const Landing = () => {
  const { role, setupCiphers } = useAppContext();

  useEffect(() => {
    setupCiphers();
    // eslint-disable-next-line
  }, []);

  return (
    <MainWrapper className="container">
      <Operation />
      {role === "user" && <History />}
      <Descriptions />
    </MainWrapper>
  );
};

export default Landing;
