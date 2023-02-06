import { authService } from 'fbase';
import { useState } from 'react';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true); // Account를 가지고 있는지 확인해서, newAccount 가 필요한 경우 true 
    const [error, setError] = useState("");
    
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (event) => { // createUserWithEmailAndPassword는 promise를 return 하기 때문에 async로 비동기화 시킴
        event.preventDefault();
        try {
            let data;

            if(newAccount) { // newAccount의 상태에 따라서 받은 input을 submit의 method로 계정 생성에 쓸건지, 로그인에 쓸건지 조건을 주고 있다.
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch(error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} className="authInput" />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} className="authInput" />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} className="authInput authSubmit" /> 
                {error && <span className='authError'>{error}</span>}
            </form>
            <span onClick={toggleAccount} className='authSwitch'>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
        </>
);
};

export default AuthForm;