import axios from "axios";
import { useEffect, useState } from "react";
import RevolutCheckout from "@revolut/checkout";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const processPayment = async () => {
    console.log("processPayment triggered");
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5005/api/create-order",
        {
          amount: 1 * 100,
          currency: "GBP",
        }
      );

      if (!response.data || !response.data.token) {
        console.log("error fetching token");
        setLoading(false);
        return;
      }

      const orderToken = response.data.token;
      const orderId = response.data.id;

      RevolutCheckout(orderToken, "sandbox")
        .then((instance) => {
          instance.payWithPopup({
            email: "example.customer@example.com",
            onSuccess() {
              navigate(`/success/${orderId}`);
            },
            onError() {
              setError("Payment failed. Please try again.");
              setLoading(false);
            },
            onCancel() {
              setLoading(false);
            },
            upsellBanner: true
          });
        })

        .catch((err) => {
          console.log("error initializing payment", err);
          setError("an error ocurred while initializing payment");
          setLoading(false);
        });
    } catch (err) {
      console.log("error creating order", err);
      setError("an error ocurred while creating your order");
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1> Integration Specialist Take Home</h1>
      </div>
      <div className="product-container">
        <div className="product-card">
          <img src="/tree.jpg" alt="christmas tree" />
          <p> Christmas tree</p>
          <p>Price: £ 1.00</p>
          <button onClick={processPayment} disabled={loading}>
            {loading ? <div className="spinner"></div> : "Order & Pay"}
          </button>
          <div>{error && <div className="error">{error}</div>}</div>
        </div>
        <div id="promotional-banner"></div>
      </div>
    </>
  );
}

export default Home;
