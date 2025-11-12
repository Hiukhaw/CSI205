import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppNav = ({ products, carts, setToken }) => {
  return (
    <div className="d-flex justify-content-center gap-2">
      <Link to={"/Home"}>
        <Button variant="outline-primary">Home</Button>
      </Link>
      <Link to={"/Calculator"}>
        <Button variant="outline-primary">Calculator</Button>
      </Link>
      <Link to={"/Animetion"}>
        <Button variant="outline-primary">Animetion</Button>
      </Link>
      <Link to={"/Component"}>
        <Button variant="outline-primary">Component</Button>
      </Link>
      <Link to={"/Todos"}>
        <Button variant="outline-primary">Todos</Button>
      </Link>
      <Link to={"/products"}>
        <Button variant="outline-primary">Products ({products.length})</Button>
      </Link>
      <Link to={"/carts"}>
        <Button variant="outline-primary position-relative">
          Carts
          {carts.length > 0 && (
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {carts.length}
              <span class="visually-hidden"></span>
            </span>
          )}
        </Button>
      </Link>

      <Button variant="outline-danger" onClick={() => {setToken('')}}>Logout</Button>
    </div>
  );
};

export default AppNav;
