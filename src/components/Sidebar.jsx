import { Link } from "react-router-dom";

const Sidebar = () => {
  const items = ["Dashboard", "Create", "URL List"];

  return (
    <div className="list-group position-fixed mt-2 bg-secondary" style={{ height: "100vh",width:"35vh"}}>
      {items.map((item, index) => (
        <Link
          key={index}
          to={`/appnav/${item.replace(" ", "").toLowerCase()}`}
          className={`list-group-item list-group-item-action ${
            location.pathname ===
            `/appnav/${item.replace(" ", "").toLowerCase()}`
              ? `active`
              : ""
          }`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
