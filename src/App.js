import "./App.css";

import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import Details from "./components/Details";
import Navbar from "./components/Navbar";
import { db } from "./Firebase";

const month = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function App() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    id: "",
    location: "",
    gender: "",
    name: "",
    date: "",
    time: "",
    image: "",
  });
  const [male, setMale] = useState("");
  const [female, setFemale] = useState("");
  const [loader, setLoader] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let filteredData = [];
    if (gender === "" && date === "" && location !== "") {
      for (let i = 0; i < data.length; i++) {
        if (data[i].location.includes(location)) {
          filteredData.push(data[i]);
        }
      }
    } else if (date === "" && location === "" && gender !== "") {
      for (let i = 0; i < data.length; i++) {
        if (data[i].gender === gender) {
          filteredData.push(data[i]);
        }
      }
    } else if (location === "" && gender === "" && date !== "") {
      console.log(date);
      var arr1 = date.split("-");
      for (let i = 0; i < data.length; i++) {
        var arr2 = data[i].date.split("-");
        if (
          Number(arr1[2]) === Number(arr2[0]) &&
          month[Number(arr1[1])] === arr2[1] &&
          arr1[0].slice(2) === arr2[2]
        ) {
          filteredData.push(data[i]);
        }
      }
    } else if (date === "" && gender !== "" && location !== "") {
      for (let i = 0; i < data.length; i++) {
        if (data[i].gender === gender && data[i].location.includes(location)) {
          filteredData.push(data[i]);
        }
      }
    } else if (gender === "" && date !== "" && location !== "") {
      for (let i = 0; i < data.length; i++) {
        if (
          Number(arr1[2]) === Number(arr2[0]) &&
          month[Number(arr1[1])] === arr2[1] &&
          arr1[0].slice(2) === arr2[2] &&
          data[i].location.includes(location)
        ) {
          filteredData.push(data[i]);
        }
      }
    } else if (location === "" && date !== "" && gender !== "") {
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].gender === gender &&
          Number(arr1[2]) === Number(arr2[0]) &&
          month[Number(arr1[1])] === arr2[1] &&
          arr1[0].slice(2) === arr2[2]
        ) {
          filteredData.push(data[i]);
        }
      }
    } else if (location !== "" && date !== "" && gender !== "") {
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].gender === gender &&
          Number(arr1[2]) === Number(arr2[0]) &&
          month[Number(arr1[1])] === arr2[1] &&
          arr1[0].slice(2) === arr2[2] &&
          data[i].location.includes(location)
        ) {
          filteredData.push(data[i]);
        }
      }
    }
    setData(filteredData);
    let male = 0,
      female = 0;
    for (let i = 0; i < filteredData.length; i++) {
      if (filteredData[i].gender === "Female") female += 1;
      else male += 1;
    }
    setMale(male);
    setFemale(female);
  };
  const resetFilters = () => {
    setLocation("");
    setGender("");
    setDate("");
    fetchData();
  };

  const fetchData = async () => {
    await getDocs(collection(db, "collections")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(newData);
      let male = 0,
        female = 0;
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].gender === "Female") female += 1;
        else male += 1;
      }
      setMale(male);
      setFemale(female);
      setLoader(false);
      console.log(newData);
    });
  };

  const getItem = (id, location, gender, name, date, time, image) => {
    setShowDetails(true);
    setSelectedItem({
      id: id,
      location: location,
      gender: gender,
      name: name,
      date: date,
      time: time,
      image: image,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="parent">
      <Navbar male={male} female={female} />
      <div className="container text-center">
        <div className="row">
          <div className="col-8 div-left">
            {!showDetails && (
              <div style={{ marginTop: "20%", marginRight: "20%" }}>
                <h2>
                  Click on the Cards in
                  <br />
                  Events section to see details
                </h2>
              </div>
            )}
            {showDetails && (
              <Details
                id={selectedItem.id}
                location={selectedItem.location}
                gender={selectedItem.gender}
                name={selectedItem.name}
                date={selectedItem.date}
                time={selectedItem.time}
                image={selectedItem.image}
              />
            )}
          </div>
          <div className="col-4 div-right">
            <nav
              className="navbar navbar-light light-blue lighten-4"
              style={{
                marginBottom: "2%",
                textAlign: "center",
              }}
            >
              <h5 style={{ marginLeft: "5%" }}>Events</h5>
              <button className="btn btn-primary" onClick={resetFilters}>
                Reset Filters
              </button>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="dark-blue-text">
                  <i class="fas fa-bars fa-1x"></i>
                </span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <form action="" onSubmit={handleSubmit}>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <input
                        type="text"
                        name="location"
                        placeholder="Enter Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </li>
                    <li className="nav-item">
                      <label htmlFor="gender">Gender : </label>
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender("Male")}
                      />
                      Male
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender("Female")}
                      />
                      Female
                    </li>
                    <li className="nav-item">
                      <label htmlFor="date">Date : </label>
                      <input
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                      <button type="submit" className="btn btn-success">
                        Apply Filters
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            </nav>
            {loader && (
              <div
                className="spinner-border text-success"
                role="status"
                style={{ marginTop: "40%" }}
              >
                <span className="sr-only"></span>
              </div>
            )}
            {!loader &&
              data.map((item) => {
                return (
                  <>
                    <div
                      key={item.id}
                      className="card text-bg-secondary mb-1 inside-div"
                      style={{ maxWidth: "18rem" }}
                      onClick={() =>
                        getItem(
                          item.id,
                          item.location,
                          item.gender,
                          item.name,
                          item.date,
                          item.time,
                          `https://drive.google.com/thumbnail?id=${item.imageID}`
                        )
                      }
                    >
                      <div className="card-body">
                        {item.date} {item.time}
                        <h5 className="card-title">
                          {item.id} : {item.location}
                        </h5>
                        <p className="card-text">Person Detected</p>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
