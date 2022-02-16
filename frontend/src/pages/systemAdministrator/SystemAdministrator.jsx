import React, { useContext } from "react";
import ApproveUser from "../../components/approveUser/ApproveUser";
import Chart from "../../components/chart/Chart";
import ListItem from "../../components/item/ListItem";
import TotalItem from "../../components/item/TotalItem";
import { ThemeContext } from "../../context/Context";

const SystemAdministrator = () => {
  const [{ currentComponentTheme }] = useContext(ThemeContext);
  const style = currentComponentTheme;

  return (
    <React.Fragment>
      <TotalItem style={style} />
      <Chart style={style} />
      <ListItem style={style} />
      <ApproveUser style={style} />
    </React.Fragment>
  );
};

export default SystemAdministrator;
