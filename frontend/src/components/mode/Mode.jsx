import { useContext } from "react";
import { ThemeContext } from "../../context/Context";
import "./mode.css";

const Mode = () => {
  const [{ isDark }, toggleTheme] = useContext(ThemeContext);

  return (
    <button className="btn-change-theme" onClick={toggleTheme}>
      <span className={`${isDark === false && "active"}`}>
        <i class="far fa-sun"></i>
      </span>
      <span className={`${isDark === true && "active"}`}>
        <i class="far fa-moon"></i>
      </span>
    </button>
  );
};

export default Mode;
