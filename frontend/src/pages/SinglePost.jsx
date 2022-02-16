import React from "react";
import CommentBox from "../components/commentBox/CommentBox";
import RightBar from "../components/rightSide/RightBar";
import "./singlePost.css";

const SinglePost = () => {
  // let { id } = useParams()
  // const {user} = useContext(Context)
  // const [news, setNew] = useState({})
  // const [username, setUserName] = useState("")
  // const [description, setDesc] = useState("")

  // const postImage = "http://localhost:5000/images/post/"
  // const location = useLocation()
  // const path = location.pathname.split("/")[2]

  // const getUser = async (id)=>{
  //             const user = await axios.get("/users/" + id)
  //             setUserName(user.data.username)
  // }

  // useEffect(() =>{
  //     const getNew = async() =>{
  //         const value = await axios.get("/posts/" + path)
  //         setNew(value.data)
  //     }
  //     getNew()
  //     if(news.userId){
  //         getUser(news.userId)
  //     }
  // },[path, news.userId])

  return (
    <div className="container-fuild">
      <img
        className="image-post"
        src="https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/sites/6/2021/08/16115025/white-rabbit-2-2.jpeg"
        alt="image1"
      ></img>
      <div className="container">
        <div className="row d-flex justify-content-between">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-9">
            <div className="post">
              <p className="categories-post">Restaurant</p>
              <p className="title-post">
                Mauris eget velit porttitor, sollicitudin turpis id, viverra
                leo. Fusce sollicitudin
              </p>
              <p className="date-post">
                <strong>Author: Keith</strong>
                <span style={{ marginLeft: "20px" }}>
                  Date: {new Date().toLocaleString()}
                </span>
              </p>
              <hr
                style={{
                  borderTop: "1px dashed rgb(226, 226, 226)",
                  width: "90%",
                  margin: "3% 0%",
                }}
              />
              <div className="content-post">
                <div className="description-post">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur gravida faucibus posuere. Suspendisse commodo
                    porttitor ultrices. Phasellus mollis orci at dolor volutpat
                    sodales. Proin ornare vulputate orci, vitae auctor nunc
                    malesuada non. Sed facilisis viverra nunc. Morbi magna ex,
                    molestie non dignissim a, sodales consectetur mi. Proin
                    elementum felis vitae lectus lacinia lobortis. Pellentesque
                    hendrerit semper maximus. Maecenas quis ullamcorper nunc,
                    eget faucibus magna. Sed non metus sem. Curabitur sed arcu
                    nec lacus posuere maximus.
                  </p>
                  <p>
                    Mauris eget velit porttitor, sollicitudin turpis id, viverra
                    leo. Fusce sollicitudin porttitor elit et faucibus. Nulla id
                    felis justo. Mauris tincidunt sagittis dui, sed iaculis
                    mauris vestibulum in. Morbi ut neque eu velit mollis
                    dignissim non ac nisl. Morbi purus dolor, lacinia at urna
                    sed, tempus ultrices lacus. Pellentesque eget ipsum sit amet
                    nulla iaculis pellentesque vitae at purus. Fusce et mi
                    malesuada eros hendrerit malesuada. Duis at porttitor lacus.
                    Duis eu nisi enim. Suspendisse et turpis suscipit libero
                    auctor viverra ac vel mi. Vestibulum imperdiet a neque ut
                    laoreet.
                  </p>
                  <img
                    src="https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/sites/6/2021/08/16115025/white-rabbit-2-2.jpeg"
                    alt="image1"
                    style={{ width: "100%", objectFit: "cover" }}
                  />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur gravida faucibus posuere. Suspendisse commodo
                    porttitor ultrices. Phasellus mollis orci at dolor volutpat
                    sodales. Proin ornare vulputate orci, vitae auctor nunc
                    malesuada non. Sed facilisis viverra nunc. Morbi magna ex,
                    molestie non dignissim a, sodales consectetur mi. Proin
                    elementum felis vitae lectus lacinia lobortis. Pellentesque
                    hendrerit semper maximus. Maecenas quis ullamcorper nunc,
                    eget faucibus magna. Sed non metus sem. Curabitur sed arcu
                    nec lacus posuere maximus.
                  </p>
                  <p>
                    Mauris eget velit porttitor, sollicitudin turpis id, viverra
                    leo. Fusce sollicitudin porttitor elit et faucibus. Nulla id
                    felis justo. Mauris tincidunt sagittis dui, sed iaculis
                    mauris vestibulum in. Morbi ut neque eu velit mollis
                    dignissim non ac nisl. Morbi purus dolor, lacinia at urna
                    sed, tempus ultrices lacus. Pellentesque eget ipsum sit amet
                    nulla iaculis pellentesque vitae at purus. Fusce et mi
                    malesuada eros hendrerit malesuada. Duis at porttitor lacus.
                    Duis eu nisi enim. Suspendisse et turpis suscipit libero
                    auctor viverra ac vel mi. Vestibulum imperdiet a neque ut
                    laoreet.
                  </p>
                </div>
                {/* 
                                                            <div className="description-post" dangerouslySetInnerHTML={{__html: news.description}}>
                                                            </div>
                                                    } */}
              </div>
              <CommentBox />
            </div>
          </div>
          <RightBar></RightBar>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
