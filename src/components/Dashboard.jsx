import React, { useEffect, useState } from "react";
import urlServices from "../services/urlServices";
import { Link } from "react-router-dom";

function Dashboard() {
  const [usrlList, setUrlList] = useState([]);
  const [monthlyClicked, setMonthlyClicked] = useState([]);
  const [dateWiseClicked, setDateWiseClicked] = useState([]);
  function getMonthName(monthNumber) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthNumber - 1]; // Subtract 1 because months are zero-based
  }
  async function getUrlList() {
    try {
      const res = await urlServices.urlList();
      setUrlList(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getMonthWiseClick() {
    try {
      const res = await urlServices.monthWiseClick();
      setMonthlyClicked(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getDateWiseClick() {
    try {
      const res = await urlServices.datewiseClicked();
      setDateWiseClicked(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const timeOutIdurl = setTimeout(() => {
      getUrlList();
      getDateWiseClick();
      getMonthWiseClick();
    }, 1000);
    return () => clearTimeout(timeOutIdurl);
  }, []);
  return (
    <div className="container mt-2 bg-info">
      <div className="row">
        {usrlList.map((url, index) => {
          const monthlyClickedById = monthlyClicked.filter(
            (clicked) => clicked._id.urlid == url._id
          );
          const dateWiseClickedById = dateWiseClicked.filter(
            (clicked) => clicked._id.urlid == url._id
          ) 
          return (
            <div key={index}>
              <Link to={url.sortUrlLink} target="_Blank">
                {url.sortUrlLink}
              </Link>
              <div style={{ color: "red", marginLeft:"20px"}}>Month Wise Clicked</div>
              {monthlyClickedById.map((clicked, index) => {
                return (
                  <div key={index} style={{marginLeft:"50px"}}>
                    <span>
                      Month : {getMonthName(clicked._id.month)},
                      {clicked._id.year}
                    </span>
                    <span> - Clicked Count : {clicked.count}</span>
                  </div>
                );
              })}
                <div style={{color:"green",marginLeft:"20px"}}>Date Wise Clicked</div>
                {dateWiseClickedById.map((clicked, index) => {
                return (
                    <div key={index} style={{marginLeft:"50px"}}>
                     <span>
                       Date : {(clicked._id.date)}
                     </span>
                     <span> - Clicked Count : {clicked.count}</span>
                    </div>
                );
              })}

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
