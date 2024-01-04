import React, { useContext } from "react";
import { userContext } from "../context/userContext";

const Popup = () => {
    const { data, popUp, setPopUp } = useContext(userContext);
    const cur = data?.[popUp - 1];

    console.log("cur: ", cur);
    return (
        <div className="popup">
            <button onClick={() => setPopUp(0)} className="close-btn">
            <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="left">
                <div className="field">
                    <h3>Name:</h3> <p>{cur?.name}</p>
                </div>
                <div className="field">
                    <h3>Username:</h3> <p>@{cur?.username}</p>
                </div>
                <div className="field">
                    <h3>Email:</h3> <p>{cur?.email}</p>
                </div>
                <div className="field">
                    <h3>Address:</h3>
                    <p>{cur?.address.street}</p>
                    <p>{cur?.address.suite}</p>
                    <p>{cur?.address.city}</p>
                    <p>{cur?.address.zipcode}</p>
                </div>
                <a target="_blank" href={`https://www.google.com/maps?q=${cur.address.geo.lat},${cur.address.geo.lng}&z=10&label=${cur.company.name}`}><i className="fa-solid fa-location-dot"></i></a>

                <div className="field">
                    <h3>Phone:</h3> <p>{cur?.phone}</p>
                </div>
            </div>

            <div className="left">
                <div className="field">
                    <h3>Website: </h3> <a href={cur?.website}>{cur?.website}</a>
                </div>

                <div className="company">
                    <div className="field">
                        <h3>Company:</h3> <p>{cur?.company.name}</p>
                    </div>
                    <p>{cur?.company.catchPhrase}</p>
                </div>
            </div>
        </div>
    );
};

export default Popup;
