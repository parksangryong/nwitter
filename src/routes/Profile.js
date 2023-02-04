import { authService } from "fbase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    let navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut()
        navigate("/");
    };

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>  
        </>
    );
};

export default Profile;