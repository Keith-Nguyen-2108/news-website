import React, { useRef, useState, useContext } from "react";
import Input from "../../components/input/Input";
// import axios from 'axios'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Context } from '../../context/Context'
import { ThemeContext } from "../../context/Context";
import "./createpost.css";

const CreatePost = () => {
  const [{ currentComponentTheme }] = useContext(ThemeContext);

  const titleRef = useRef();
  const shortDescriptionRef = useRef();
  const [content, setContentPost] = useState("");
  const [categories, setCatePost] = useState([]);
  // const [title, setTitlePost] = useState("");
  // const [shortDescription, setShortContentPost] = useState("");
  // const [description, setContentPost] = useState("");
  const [avatar, setAvatar] = useState(null);
  // const [category, setCategory] = useState([]);

  // const getCategory = async() =>{
  //         await axios.get("/categories")
  //                     .then(res =>{
  //                         const value = res.data
  //                         setCategory(value)
  //                     })
  // }

  // useEffect(()=>{

  //     getCategory()
  // },[])

  // const hanldeChange = async(e) =>{
  //     if(e.target.files){
  //         const images = Array.from(e.target.files)
  //         if(images.length < 1){
  //             alert("You must upload an images for avatar of an article")
  //         }
  //         else{
  //             setImage(images)
  //         }
  //     }
  // }

  // const {user} = useContext(Context)

  const hadleSubmit = async (e) => {
    // e.preventDefault();
    const post = {
      title: titleRef.current.value(),
      shortDescription: shortDescriptionRef.current.value,
      content,
      // userId: user._id,
      // categories,
    };
    console.log(post);
    // if(photos){
    //     const data = new FormData();
    //     const d = new Date();
    //     const moment = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + "-" + d.getHours() + "-"
    //     let arrName = []
    //     for (let i = 0; i < photos.length; i++) {
    //         data.append("files", photos[i])
    //         arrName.push( moment + photos[i].name)
    //     }
    //     post.photos = arrName
    //     try{
    // console.log(arrName)
    // const res = await axios.post("/posts/create" , post)
    // if(res){
    //     await axios.post("/upload/post/avatar", data)
    //     alert("Your article has been sent. Please, waiting for approval")
    //     window.location.replace("/articlelist")
    // }
    // console.log(post)
    //     }
    //     catch(err){
    //         alert("Change your title!")
    //     }
    // }
    //}
  };
  // console.log("rerender-create post");

  // console.log(avatarRef.current);

  return (
    <div className="container">
      <div
        className="bg-createPost"
        style={{
          backgroundColor: currentComponentTheme.backgroundColor,
          color: currentComponentTheme.color,
        }}
      >
        <p className="titlePage">Create new post</p>
        <form
          name="frmCreatePost"
          id="frmCreatePost"
          method="post"
          action=""
          encType="multipart/form-data"
          // onSubmit={(e) => hadleSubmit(e)}
        >
          <div className="form-group mt-4">
            <label htmlFor="slTopic">Topic post:</label>
            <select
              className="form-select"
              onChange={(e) => setCatePost(e.target.value)}
              defaultValue=""
            >
              <option key="" value="" disabled="disabled">
                Choose a topic
              </option>
              {/* {
                                    category.map(item =>(
                                            <option key={item._id} value={item.cateName}>{item.cateName}</option>
                                    )) 
                                } */}
            </select>
          </div>
          <div className="form-group mt-4">
            <Input
              label="Title post"
              type="text"
              id="txtTitlePost"
              ref={titleRef}
              placeholder="Enter title"
              className="form-control border"
              min={1}
              required={true}
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="txtShortDesc">Short description:</label>
            <textarea
              className="form-control"
              id="txtShortDesc"
              rows="10"
              placeholder="Enter short description"
              type="text"
              required
              ref={shortDescriptionRef}
            ></textarea>
          </div>
          <div className="form-group mt-4">
            <label htmlFor="txtContentPost">Content post: </label>
            <CKEditor
              id="txtContentPost"
              editor={ClassicEditor}
              placeholder="Enter content"
              enterMode="CKEDITOR.ENTER_P"
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
                setContentPost(data);
              }}
              config={{
                ckfinder: {
                  uploadUrl: "/upload/post",
                },
                mediaEmbed: {
                  previewsInData: true,
                },
              }}
            />
          </div>
          <Input
            label="Avatar post"
            type="file"
            id="txtImagesPost"
            className="form-control border"
            required={true}
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          <div className="d-flex flex-wrap mt-4">
            {avatar != null && (
              <img
                src={URL.createObjectURL(avatar)}
                alt="preview"
                className="image-preview mb-3"
              />
            )}
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button
              type="button"
              className="btn btn-success"
              id="btnCreatePost"
              onClick={(e) => hadleSubmit(e)}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
