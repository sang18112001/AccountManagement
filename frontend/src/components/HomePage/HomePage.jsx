import { useSelector } from "react-redux";
import "./homepage.css";
import SignedHomePage from "./SignedHomePage";
import SignHomePage from "./SignHomePage";

const HomePage = () => {

  const currentUser = useSelector((state) => state.auth.login.currentUser);
  return (
    <section className="homepage">
      <div className="homepage-circles">
        <span className="circle id1"></span>
        <span className="circle id2"></span>
        <span className="circle id3"></span>
        <span className="circle id4"></span>
        <span className="circle id5"></span>
        <span className="circle id6"></span>
        <span className="circle id7"></span>
      </div>
      {currentUser?.accessToken ? (
        <SignedHomePage currentUser={currentUser} />
      ) : (
        <SignHomePage />
      )}
    </section>
  );
};

export default HomePage;
