import "./App.css";
import React, { Suspense, useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "./redux/store/store";

import Loading from "./components/loading/Loading";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import SinglePost from "./pages/SinglePost";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import CreatePost from "./pages/user/CreatePost";
import Profile from "./pages/user/Profile";
import SystemAdministrator from "./pages/systemAdministrator/SystemAdministrator";
import UpdateInfo from "./pages/user/UpdateInfo";
import ArticlesList from "./pages/user/ArticlesList";
import Mode from "./components/mode/Mode";
import { ThemeContext } from "./context/Context";
import CategoryPage from "./pages/CategoryPage";
// import Home from "./pages/Home";

const HomePage = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./pages/Home")), 2000);
  });
});

function App() {
  const user = useSelector((state) => state.user.user);
  const history = useHistory();

  const [{ currentTheme }] = useContext(ThemeContext);

  return (
    <div
      className="App"
      style={{
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.color,
      }}
    >
      <Suspense fallback={<Loading />}>
        <Header user={user} />
        <Mode />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/article/:id">
            <SinglePost user={user} />
          </Route>
          <Route path="/category/:name">
            <CategoryPage />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/create">
            {user ? <CreatePost user={user} /> : history.push("/signin")}
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/dashboard">
            <SystemAdministrator />
          </Route>
          <Route path="/create-article">
            <CreatePost />
          </Route>
          <Route path="/update-profile">
            <UpdateInfo />
          </Route>
          <Route path="/articles-list">
            <ArticlesList />
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
