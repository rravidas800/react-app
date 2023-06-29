import React from "react";

import UserContaxt from "./user-contaxt";

const UserState=({children})=>{

    const userdata={"name":"ravindra"};

    return (
        <UserContaxt.Provider value={userdata}>
                {children}
        </UserContaxt.Provider>
    )
}

export default UserState;