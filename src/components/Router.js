import { HashRouter as Router, Route, Routes,  } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Routes>
                {isLoggedIn ? (
                    <div style={{maxWidth: 890, width: "100%", margin: "0 auto", marginTop: 80, display: "flex", justifyContent: "center"}}>
                    <Route exact={true} path="/" element={<Home userObj={userObj} />} />
                    <Route exact={true} path="/profile" element={<Profile refreshUser={refreshUser} userObj={userObj} />} />
                    </div>
                ) : (
                    <Route exact={true} path="/" element={<Auth />} />
                )}
            </Routes>
        </Router>
    );
}

export default AppRouter;