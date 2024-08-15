import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div>
        <Link to="/users">Users</Link>
      </div>
      <div>
        <Link to="/products">Products</Link>
      </div>
    </>
  );
};
