import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import "./articledetail.css";

const ArticleDetails = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [shortDescription, setShortContentPost] = useState("");
  const [image, setImage] = useState([]);
  const [review, setReview] = useState([]);
  const [update, setUpdate] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const postImage = "http://localhost:5000/images/post/";
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState([]);
  const [reject, setReject] = useState(false);
  // const getCategory = async() =>{
  //         await axios.get("/categories")
  //                     .then(res =>{
  //                         const value = res.data
  //                         setCategory(value)
  //                     })
  // }

  // useEffect(()=>{
  // getCategory()
  // const getNew = async() =>{
  //     const post = await axios.get("/posts/" + path)
  //     setTitle(post.data.title)
  //     setCategories(post.data.categories)
  //     setDesc(post.data.description)
  //     setImage(post.data.photos)
  //     setStatus(post.data.status)
  //     setShortContentPost(post.data.shortDescription)
  // }
  // getNew()
  // console.log(path)
  // },[path])

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const user = "Author";

  const handleChange = (e) => {
    // if(e.target.files){
    //     let images = Array.from(e.target.files)
    //     if(images.length !== 2){
    //         alert("You must upload 2 images for an article")
    //     }
    //     else{
    //         setReview(images)
    //     }
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const value = {
    //     title,
    //     shortDescription,
    //     description,
    //     userId: user._id,
    //     categories,
    //     status: "Updated"
    // }
    // // console.log(value)
    // if(review.length>1){
    //     const data = new FormData()
    //     const d = new Date()
    //     let arrName = []
    //     const moment = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + "-" + d.getHours() + "-"
    //     for(let i=0; i< review.length; i++){
    //         data.append("files", review[i])
    //         arrName.push(moment + review[i].name)
    //     }
    //     value.photos = arrName
    //     try{
    //         await axios.post("/upload/post", data)
    //     }catch(err){
    //         console.error(err)
    //     }
    // }
    // try{
    //     await axios.put("/posts/"+ path, value)
    //     alert("Your article has been update")
    //     window.location.replace("/articlelist")
    // }catch(err){
    //     console.error(err)
    // }
    // console.log(value)
  };

  const handleApprove = async (e) => {
    // let value = {
    //     status: "Approved",
    //     // rejectReason:""
    // }
    // await axios.put("/posts/"+path, value)
    //             .then(()=>{
    //                 window.location.replace("/profile")
    //             })
    //             .catch(err=>{
    //                 console.log(err)
    //             })
  };

  const handleReject = (e) => {
    setReject(!reject);
  };

  const handleSave = async (e) => {
    // let value = {
    //     title,
    //     shortDescription,
    //     description,
    //     categories,
    //     status:"Reject",
    // }
    // await axios.put("/posts/"+path, value)
    //             .then(()=>{
    //                 window.location.replace("/profile")
    //             })
    //             .catch(err=>{
    //                 console.log(err)
    //             })
  };

  return (
    <div className="container">
      {title !== "" ? (
        <div className="bg-articleDetail">
          <p className="titlePage">Article Details</p>
          <form
            name="frmArticleDetail"
            id="frmArticleDetail"
            method="post"
            action=""
          >
            {status === "Reject" && (
              <h6
                className="text-left"
                style={{ fontSize: "25px", color: "red" }}
              >
                Bolded words need to be corrected
              </h6>
            )}

            <div className="form-group mt-4">
              <label htmlFor="slTopic">Topic post:</label>
              {update || reject ? (
                <select
                  className="form-select"
                  onChange={(e) => setCategories(e.target.value)}
                >
                  <option key="" value="" selected={true} disabled="disabled">
                    Choose a topic
                  </option>
                  {category.map((item) => (
                    <option key={item._id} value={item.cateName}>
                      {item.cateName}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="mt-2">{categories}</p>
              )}
            </div>
            <div className="form-group mt-4">
              <label htmlFor="txtTitlePost">Title post:</label>
              {update || reject ? (
                <input
                  type="text"
                  className="form-control"
                  id="txtTitlePost"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              ) : (
                <p className="mt-2">{title}</p>
              )}
            </div>
            <div className="mt-4">
              <label>Avatar:</label>
              {!update
                ? image.length > 0 && (
                    <div>
                      <img
                        src={postImage + image}
                        alt="preview"
                        className="image-preview mt-3 mb-3"
                        key={image}
                        style={{
                          width: "250px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )
                : null}
            </div>
            <div className="form-group mt-4">
              <label htmlFor="txtContentPost">Short description:</label>
              {update || reject ? (
                // <textarea className="form-control" id="txtContentPost" value={shortDescription} rows="10" type="text" onChange={(e) => setShortContentPost(e.target.value)}></textarea>
                <CKEditor
                  editor={ClassicEditor}
                  data={shortDescription}
                  enterMode="CKEDITOR.ENTER_P"
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    //console.log( { event, editor, data } );
                    setShortContentPost(data);
                  }}
                />
              ) : (
                <div
                  className="mt-2"
                  dangerouslySetInnerHTML={{ __html: shortDescription }}
                ></div>
              )}
            </div>
            <div className="form-group mt-4">
              <label htmlFor="txtContentPost">Content post:</label>
              {update || reject ? (
                //<textarea className="form-control" id="txtContentPost" value={description} rows="10" type="text" onChange={(e) => setDesc(e.target.value)}></textarea>
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  enterMode="CKEDITOR.ENTER_P"
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    setDesc(data);
                  }}
                  config={{
                    mediaEmbed: {
                      previewsInData: true,
                    },
                  }}
                />
              ) : (
                <div
                  className="mt-2"
                  dangerouslySetInnerHTML={{ __html: description }}
                ></div>
              )}
            </div>
            {update ? (
              <>
                <div className="form-group mt-4">
                  <label htmlFor="txtImagesPost">
                    Images post:
                    <i
                      className="fa fa-paperclip"
                      aria-hidden="true"
                      style={{ marginLeft: "10px" }}
                    ></i>
                    <span
                      className="text-danger"
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        marginLeft: "10px",
                      }}
                    >
                      when you change images, the old images of your article
                      will be replaced by the news
                    </span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="txtImagesPost"
                    name="txtImagesPost"
                    onChange={handleChange}
                    multiple
                    required
                    style={{ display: "none" }}
                  />
                </div>
                <div className="d-flex justify-content-around flex-wrap mt-4">
                  {review &&
                    review.map((item) => (
                      <img
                        src={URL.createObjectURL(item)}
                        alt="preview"
                        className="image-preview mb-3"
                      />
                    ))}
                </div>
              </>
            ) : null}

            <div className="d-flex justify-content-around flex-wrap mt-4">
              {!update
                ? image.length > 1 &&
                  image
                    .slice(1)
                    .map((item) => (
                      <img
                        src={postImage + item}
                        alt="preview"
                        className="image-preview mb-3"
                        key={item}
                      />
                    ))
                : null}
            </div>
            {user
              ? user.role === "Author" && (
                  <div className="d-flex justify-content-evenly mt-4">
                    <button
                      type="button"
                      className="btn btn-success"
                      id="btnUpdateArticle"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      id="btnSaveArticle"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                )
              : null}

            {user
              ? user.role === "Administrator" && (
                  <div className="buttonList d-flex justify-content-evenly">
                    <button
                      type="button"
                      className="btn btn-primary btnApprove"
                      onClick={handleApprove}
                    >
                      Approve
                    </button>
                    {reject ? (
                      <button
                        type="button"
                        className="btn btn-success btnSave"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-danger btnReject"
                        onClick={handleReject}
                      >
                        Reject
                      </button>
                    )}
                  </div>
                )
              : null}
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default ArticleDetails;
