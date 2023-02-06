import { authService, dbService } from "fbase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Profile = ({userObj, refreshUser}) => {
    let navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut()
        navigate("/");
    };

    const onChange = (event) => {
        const{target: {value}}=event;
        setNewDisplayName(value);
    };

    const onSubmit= async (event) => {
        event.preventDefault();
        const user = authService.currentUser;
        if (userObj.displayName !== newDisplayName) {
                await updateProfile(user, {displayName: newDisplayName});
                refreshUser(); // refreshuser가 쓰이는 부분
            }
    };

    return (
        <>
        <form onSubmit={onSubmit}>
            <input type="text" onChange={onChange} placeholder="Display name" value={newDisplayName} />
            <input type="submit" value="Update Profile" />
        </form>
            <button onClick={onLogOutClick}>Log Out</button>  
        </>
    );
};

export default Profile;