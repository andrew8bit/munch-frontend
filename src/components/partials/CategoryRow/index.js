import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./categoryRow.css";

const { REACT_APP_SERVER_URL } = process.env;

const CategoryRow = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categories.length < 1) {
      getCategories();
    }
  }, [])

  const getCategories = () => {
    axios
    .get(`${REACT_APP_SERVER_URL}/categories/all`)
    .then((response) => {
      const { results } = response.data;
      setCategories(results);
    })
    .catch((error) => {
      console.log("===> Error When Getting Categories", error);
      alert("Could Not Display Categories");
    });
  }

  const categoryArray = categories.map((category) => {
    return (
      <li className="categoryListItem col-md-1 m-3 p-0" key={category._id}>
        <Link to={`/feed?search=${category.name}`} >
          <div className="categoryDiv card bg-transparent rounded-circle">
            <img
              src={category.picture}
              className="card-img img-fluid"
              alt={`Profile Img for ${category.name}`}
            />
            <div className="container position-absolute top-100 start-50 translate-middle h-25 mt-1 text-center p-0">
              <h5 className="card-title text-capitalize fw-bold mt-2">
                {category.name}
              </h5>
            </div>
          </div>
        </Link>
      </li>
    );
  });

  return (
    <nav className="categoryNav">
      <ul className="row categoryContainer">{categoryArray}</ul>
    </nav>
  );
}

export default CategoryRow;