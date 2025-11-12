import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Products = ({ products, carts, setCarts }) => {
  return (
    <div className="products-container mt-3">
      <div className="products-itemps-container">
        {products.map((product) => {
          return (
            <Card key={product.id} style={{ width: "18rem" }}>
              <Card.Img variant="top" src={product.thumbnailUrl} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>

                <Card.Text>
                  <b>${product.price.toFixed(2)}</b>
                </Card.Text>
                {carts.find((cart) => cart.id === product.id) ? (
                    <span className="badge bg-danger">Added</span>
                ) : (

                  <Button
                  variant="outline-primary"
                  onClick={() => setCarts([...carts, product])}
                >
                  Add to cart
                </Button>
                )}
                
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
