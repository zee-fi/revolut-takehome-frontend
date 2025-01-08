import { useParams } from "react-router-dom";

function Success () {
    const { orderId } = useParams();
    console.log("Order ID from URL:", orderId);
    return(
        <>
            <div>
                <h1>Success</h1>
                <h3>Your order is complete and payment has been processed</h3>
                <p>Order Id: {orderId}</p>
            </div>
        </>
    )
}

export default Success;