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
        <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input type="text" onChange={onChange} placeholder="Display name" value={newDisplayName} autoFocus className="formInput" />
            <input type="submit" value="Update Profile" className="formBtn" style={{marginTop: 10}} />
        </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};

export default Profile;