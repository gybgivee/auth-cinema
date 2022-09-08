import { UserDataContext } from "../contexts/UserData.context"
import { useContext, useState } from "react";
const Nav = () => {
   const {currentUser,setCurrentUser} = useContext(UserDataContext);
    const signOutUser = () => {
        localStorage.clear();
    }
    return (
        <>
            <div className="navigation">
                <div className="navigation--left-container">
                    <img src="../assets/img/logo.svg" alt="" />
                </div>
                <div className="navigation--right-container">
                    {
                        currentUser ?
                            (<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>) : {}
                    }
                </div>
            </div>
        </>
    )


}
export default Nav;