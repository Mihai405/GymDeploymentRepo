import { Fragment, useContext } from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";
import AuthContext from "../../store/auth-context";
import NavBarTrainer from "./NavbarTrainer";
import NavbarAdmin from "./NavbarAdmin";
const Layout = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      {authCtx.role === "CLIENT" && <NavBar />}
      {authCtx.role === "TRAINER" && <NavBarTrainer />}
      {authCtx.role === "ADMIN" && <NavbarAdmin />}
      <main style={{ marginTop: "100px" }}>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
