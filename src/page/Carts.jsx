import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Carts = ({ carts, setCarts }) => {
  return (
    <div className="products-container mt-3">
      <div className="products-itemps-container">
        {carts.map((cart) => {
          return (
            <Card key={cart.id} style={{ width: "18rem" }}>
              <Card.Img variant="top" src={cart.thumbnailUrl} />
              <Card.Body>
                <Card.Title>{cart.title}</Card.Title>

                <Card.Text>
                  <b>${cart.price.toFixed(2)}</b>
                </Card.Text>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    setCarts(carts.filter((c) => c.id !== cart.id));
                  }}
                >
                  Remove From Carts
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <h4 className="mt-3">
        Item : <button type="button" class="btn btn-danger">{carts.length}&nbsp;items</button> - Total Price : <button type="button" class="btn btn-success">$
        {carts
          .reduce((prev, cart) => {
            return prev + cart.price;
          }, 0)
          .toFixed(2)}</button>
      </h4>
     <button type="button" class="btn btn-warning">Checkout&nbsp;<i class="bi bi-credit-card"></i></button>
    </div>
  );
};

export default Carts;
