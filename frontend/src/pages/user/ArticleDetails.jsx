import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { axiosGetData, linkAvtPost } from "../../components/axios";
import "./articledetail.css";

const ArticleDetails = ({ user }) => {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [shortDescription, setShortContentPost] = useState("");
  const [avatar, setAvatar] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);
  const [update, setUpdate] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [category, setCategory] = useState("");
  let [smallCategories, setSmallCategories] = useState([]);
  const [bigCategories, setBigCategories] = useState([]);

  const [reject, setReject] = useState(false);

  const getCategories = async () => {
    await axiosGetData.get("/category").then((res) => {
      const value = res.data;
      const bigCate = value.filter((item) => item.parentID === null);
      setBigCategories(bigCate);
      const smallCate = value.filter((item) => item.parentID !== null);
      setSmallCategories(smallCate);
    });
  };

  useEffect(() => {
    getCategories();
    const getNew = async () => {
      const post = await axiosGetData.get("/post/" + path);
      setTitle(post.data.title);
      setCategory(post.data.categoriesID.cateName);
      setDesc(post.data.description);
      setAvatar(post.data.avatar);
      // setStatus(post.data.status)
      setShortContentPost(post.data.shortDescription);
    };
    getNew();
  }, [path]);

  const handleChangeBigCategory = (e) => {
    if (e.target.value) {
      let arraySmallCate = [...smallCategories].splice(0, 14);
      arraySmallCate = arraySmallCate.filter(
        (cate) => cate.parentID.cateName === e.target.value
      );
      // console.log(arraySmallCate);
      // arraySmallCate.unshift({
      //   _id: "Nothing",
      //   cateName: "",
      // });
      smallCategories = smallCategories.filter((cate) => !Array.isArray(cate));
      let newArr = [...smallCategories, arraySmallCate];
      setSmallCategories(newArr);
    }
  };

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = {
      title,
      shortDescription,
      description,
      categoriesID: category,
      authorID: user.id,
      status: "Updated",
    };
    console.log(value);
    // if (newAvatar) {
    //   const data = new FormData();
    //   const d = new Date();
    //   const moment =
    //     d.getDate() +
    //     "-" +
    //     (d.getMonth() + 1) +
    //     "-" +
    //     d.getFullYear() +
    //     "-" +
    //     d.getHours() +
    //     "-";
    //   const filename = newAvatar.name;
    //   data.append("name", filename);
    //   data.append("file", newAvatar);
    //   value.avatar = moment + filename;
    //   try {
    //     await axiosGetData.post("/upload/post/avatar", data);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
    // try {
    //   await axiosGetData.patch("/post/" + path, value);
    //   alert("Your article has been update");
    //   window.location.replace("/articles-list");
    //   console.log(value);
    // } catch (err) {
    //   console.error(err);
    // }
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
            encType="multipart/form-data"
          >
            {/* {status === "Reject" && (
              <h6
                className="text-left"
                style={{ fontSize: "25px", color: "red" }}
              >
                Bolded words need to be corrected
              </h6>
            )} */}
            {update ? (
              <React.Fragment>
                <div className="form-group mt-4">
                  <label htmlFor="slTopic">Big topic post:</label>
                  <select
                    className="form-select"
                    onChange={(e) => handleChangeBigCategory(e)}
                    defaultValue=""
                  >
                    <option key="" value="" disabled="disabled">
                      Choose a big topic
                    </option>
                    {bigCategories.map((item) => (
                      <option key={item._id} value={item.cateName}>
                        {item.cateName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="slTopic">
                    Small topic post - Main topic:
                  </label>
                  <select
                    className="form-select"
                    onChange={(e) => setCategory(e.target.value)}
                    defaultValue=""
                  >
                    <option key="" value="" disabled="disabled">
                      Choose a main topic
                    </option>
                    {Array.isArray(
                      smallCategories[smallCategories.length - 1]
                    ) &&
                      smallCategories[smallCategories.length - 1].map(
                        (item) => (
                          <option key={item._id} value={item._id}>
                            {item.cateName}
                          </option>
                        )
                      )}
                  </select>
                </div>
              </React.Fragment>
            ) : (
              <div className="form-group mt-4">
                <label htmlFor="slTopic">Topic post:</label>
                <p className="mt-2">{category}</p>
              </div>
            )}

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
              <img
                src={linkAvtPost + avatar}
                className="image-preview mt-3 mb-3"
                alt={avatar}
                style={{
                  width: "250px",
                  height: "150px",
                  objectFit: "cover",
                  marginLeft: "50px",
                }}
              />
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
                      When you change images, the old avatar of your article
                      will be replaced by the new
                    </span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="txtImagesPost"
                    name="txtImagesPost"
                    onChange={(e) => setNewAvatar(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="d-flex justify-content-around flex-wrap mt-4">
                  {newAvatar && (
                    <img
                      src={URL.createObjectURL(newAvatar)}
                      alt="preview"
                      className="image-preview mb-3"
                    />
                  )}
                </div>
              </>
            ) : null}

            {/* <div className="d-flex justify-content-around flex-wrap mt-4">
              {!update
                ? image.length > 0 &&
                  image
                    .slice(1)
                    .map((item) => (
                      <img
                        src={linkAvtPost + item}
                        alt="preview"
                        className="image-preview mb-3"
                        key={item}
                      />
                    ))
                : null}
            </div> */}
            {user
              ? user.role?.roleName === "Author" && (
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
              ? user.role?.roleName === "Editor" && (
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
