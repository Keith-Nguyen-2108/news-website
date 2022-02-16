import React, { useContext } from "react";
import { ThemeContext } from "../../context/Context";
import { category } from "../slider/sliderItem";
import "./rightbar.css";

const RightBar = () => {
  const [{ currentTheme }] = useContext(ThemeContext);

  // const [rightNews, setRightNews] = useState([])
  // const pf = "http://localhost:5000/images/post/"

  // const getArticals = async() =>{
  //         await axios
  //             .get("/posts" )
  //             .then(res=>{
  //                 let value= res.data
  //                 value = value.reverse().sort(() => 0.5 - Math.random()).slice(0,5)
  //                 setRightNews(value)

  //             })
  //     }

  // useEffect(()=>{
  //     getArticals()
  // },[])

  // let history = useHistory() - onClick={ () => history.push(`/news/${item._id}`)}

  return (
    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-3">
      <div
        className="sub-news"
        style={{
          backgroundColor: currentTheme.backgroundColor,
          color: currentTheme.color,
        }}
      >
        <div className="d-flex" key="nothing">
          <p className="decor">Recommend </p>
        </div>
        {category &&
          category.map((item) => (
            <div
              className="d-flex rightbar"
              key={item.id}
              style={{ cursor: "pointer" }}
            >
              <img className="image-rightbar" src={item.src} alt={item.src} />
              <p className="title-rightbar">
                Mauris eget velit porttitor, sollicitudin turpis id, viverra leo
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RightBar;
