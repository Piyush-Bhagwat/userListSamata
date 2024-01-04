import { useContext, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Card from "./components/Card";
import { userContext } from "./context/userContext";
import Popup from "./components/popup";

function App() {
    const { data, setData, popUp } = useContext(userContext);
    const [serchEnable, setSearchEnabled] = useState(false);
    const [searchData, setSearchData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [localData, setLocalData] = useState(null);
    const [sort, setSort] = useState(false);

    const getData = async () => {
        axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
            setData(res.data);
            setLocalData(res.data);
        });
    };

    useEffect(() => {
        getData();
        setSearchData(JSON.parse(localStorage.getItem("searchData")));
    }, []);

    const renderUserCard = () => {
        if (localData) {
            if (sort) {
                return localData
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    ?.map((person) => {
                        return (
                            <Card
                                name={person.name}
                                email={person.email}
                                userName={person.username}
                                id={person.id}
                                key={person.name}
                            />
                        );
                    });
            } else {
                return localData?.map((person) => {
                    return (
                        <Card
                            name={person.name}
                            email={person.email}
                            userName={person.username}
                            id={person.id}
                            key={person.name}
                        />
                    );
                });
            }
        }
    };

    const renderHistory = () => {
        return (
            <div className="search-history">
                {searchData?.map((sear) => (
                    <p>{sear}</p>
                ))}
            </div>
        );
    };

    const handleSearch = () => {
        if (searchTerm == "") {
            setLocalData(data);
            return;
        }

        const found = data?.filter((per) =>
            per.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        if (found.length === 0) {
            setLocalData(data);
            return;
        }
        setLocalData(found);

        if (searchData) {
            setSearchData((prev) => [searchTerm, ...prev]);
        } else {
            setSearchData([searchTerm]);
        }
    };

    useEffect(() => {
        if (searchData) {
            localStorage.setItem("searchData", JSON.stringify(searchData));
        }
    }, [searchData]);

    return (
        <div className="App">
            <div className="nav">
                <h1>Users List</h1>

                <button className={`sort ${sort && "sorted"}`} onClick={() => setSort(prev => !prev)}>
                    <i class="fa-solid fa-arrow-down-a-z"></i>
                </button>

                <div className="search-box">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setSearchEnabled(true)}
                        onBlur={() => setSearchEnabled(false)}
                    />
                    <button onClick={handleSearch} className="search-btn">
                        <i class="fa-solid fa-circle-chevron-right"></i>
                    </button>
                    {serchEnable && renderHistory()}
                </div>
            </div>

            <div className="card-container">{renderUserCard()}</div>

            {popUp ? <Popup /> : ""}
        </div>
    );
}

export default App;
