import React, { useRef, useState, useContext, useEffect } from "react";
import Input from "../../components/input/Input";
// import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Context } from '../../context/Context'
import { ThemeContext } from "../../context/Context";
import { axiosGetData } from "../../components/axios";
import "./createpost.css";

const CreatePost = ({ user }) => {
  const [{ currentComponentTheme }] = useContext(ThemeContext);
  // console.log(user);

  const titleRef = useRef();
  const shortDescriptionRef = useRef();
  const [category, setCategory] = useState({} || null);
  let [smallCategories, setSmallCategories] = useState([]);
  const [bigCategories, setBigCategories] = useState([]);
  // const [onWrite, setOnWrite] = useState(true);

  // const [languages, setLanguages] = useState([]);
  // const [from, setFrom] = useState("en");
  // const [input, setInput] = useState("");
  // const [output, setOutput] = useState("");
  // const [title, setTitlePost] = useState("");
  // const [shortDescription, setShortContentPost] = useState("");

  const [description, setContentPost] = useState("");
  const [avatar, setAvatar] = useState(null);

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
    // axios.get("https://libretranslate.de/languages").then((res) => {
    //   setLanguages(res.data);
    // });
    getCategories();
  }, []);

  const [index, setIndex] = useState(0);

  const handleChangeBigCategory = (e) => {
    if (e.target.value) {
      let arraySmallCate = [...smallCategories].splice(0, 14);
      arraySmallCate = arraySmallCate.filter(
        (cate) => cate.parentID.cateName === e.target.value
      );
      // console.log(arraySmallCate);
      arraySmallCate.unshift({
        _id: "Invalid",
        cateName: "Choose a main topic",
      });
      setIndex(1);
      setCategory("");
      smallCategories = smallCategories.filter((cate) => !Array.isArray(cate));
      let newArr = [...smallCategories, arraySmallCate];
      setSmallCategories(newArr);
    }
  };

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

  // const changeSelect = (e) => {
  //   if (e.target.value !== "") {
  //     setOnWrite(!onWrite);
  //     console.log(e.target.value);
  //     setFrom(e.target.value);
  //   }
  // };

  // const translate = async () => {
  //   let to = "en";
  //   let params = {
  //     q: input,
  //     source: from,
  //     target: to,
  //     api_key: "xxxxxxxx--xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  //   };
  //   await axios
  //     .post("https://libretranslate.de/translate", params)
  //     .then((res) => {
  //       setOutput(res.data.translatedText);
  //       console.log(output);
  //     });
  // };

  const formatPost = async () => {
    let checkCate = category._id ? category._id : category;
    if (checkCate.length < 1) {
      alert("Please choose an main option again");
    } else {
      const post = {
        title: titleRef.current.value(),
        shortDescription: shortDescriptionRef.current.value,
        description,
        categoriesID: category,
        authorID: user.id,
      };
      const data = new FormData();
      const d = new Date();
      const moment =
        d.getDate() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getFullYear() +
        "-" +
        d.getHours() +
        "-";
      const filename = avatar.name;
      data.append("name", filename);
      data.append("file", avatar);
      post.avatar = moment + filename;
      console.log(post);
      try {
        const res = await axiosGetData.post("/post/create", post);
        if (res) {
          await axiosGetData.post("/upload/post/avatar", data);
          alert("Your article has been sent. Please, waiting for approval");
          window.location.replace("/profile");
        }
        // console.log(post);
      } catch (err) {
        alert(err);
      }
    }
  };

  const hadleSubmit = async (e) => {
    e.preventDefault();
    // translate();
    if (!avatar) {
      alert("You must upload an images for avatar of an article");
    } else {
      await formatPost();
    }
  };

  return (
    <div className="container">
      <div
        className="bg-createPost"
        style={{
          backgroundColor: currentComponentTheme.backgroundColor,
          // color: currentComponentTheme.color,
        }}
      >
        <p className="titlePage">Create new post</p>
        {/* <p
          className="note"
          style={{
            fontSize: "14px",
            color: "red",
          }}
        >
          Your article will be automatically translated into English
        </p> */}
        <form
          name="frmCreatePost"
          id="frmCreatePost"
          method="post"
          action=""
          encType="multipart/form-data"
          // onSubmit={(e) => hadleSubmit(e)}
        >
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
            <label htmlFor="slTopic">Small topic post - Main topic:</label>
            <select
              className="form-select"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
            >
              {index === 0 && (
                <option key="" value="" disabled="disabled">
                  Choose a main topic
                </option>
              )}

              {Array.isArray(smallCategories[smallCategories.length - 1]) &&
                smallCategories[smallCategories.length - 1].map((item) => (
                  <option
                    key={item._id}
                    value={`${item._id === "Invalid" ? "" : item._id}`}
                    // disabled={item._id === "Invalid" ? true : false}
                    // selected={item._id === "Invalid" ? true : false}
                  >
                    {item.cateName}
                  </option>
                ))}
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
            <label htmlFor="txtContentPost">
              Content post:
              {/* <select
                defaultValue={"default"}
                className="select__language"
                onChange={(e) => changeSelect(e)}
              >
                <option key="" value="default" disabled>
                  Choose a language to change
                </option>
                {languages &&
                  languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
              </select> */}
            </label>
            <CKEditor
              id="txtContentPost"
              editor={ClassicEditor}
              placeholder="Enter content"
              enterMode="CKEDITOR.ENTER_P"
              // disabled={onWrite}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContentPost(data);
              }}
              config={{
                ckfinder: {
                  uploadUrl: "http://localhost:8000/api/upload/post",
                },
                // mediaEmbed: {
                //   previewsInData: true,
                // },
                // isReadOnly: onWrite,
              }}
              style={{
                color: "black",
              }}
            />
          </div>
          {/* <div className="form-group mt-4">
              
          </div> */}

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
