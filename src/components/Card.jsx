import React, { useContext } from "react";
import { userContext } from "../context/userContext";

const Card = ({ name, userName, email, id }) => {
    const { setPopUp, popUp } = useContext(userContext);

    return (
        <div
            className="card"
            onClick={() => {
                if (!popUp) setPopUp(id);
            }}
        >
            <h3>{name}</h3>
            <p>
                {" "}
                <u> @{userName}</u>
            </p>
            <p>{email}</p>
        </div>
    );
};

export default Card;
