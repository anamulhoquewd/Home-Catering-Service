import Customer from "../models/customerModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

const getOrders = async (c: any) => {
  try {
    const asAdmin = c.get("admin"); // Check if the user is an admin
    const asManager = c.get("manager"); // Check if the user is a manager
    const asCustomer = c.get("customer"); // Check if the user is a logged-in customer

    let orders;
    console.log(orders, asAdmin, asManager, asCustomer);

    if (asAdmin) {
      // Admin can see all orders
      orders = await Order.find();
    } else if (asManager) {
      // Manager can see all orders
      orders = await Order.find().populate("customer");
    } else if (asCustomer) {
      orders = await Order.find({ customer: asCustomer._id })
        .populate("customer")
        .populate("products");
    } else {
      return c.json({ message: "Unauthorized" }, 401);
    }

    if (!orders || orders.length === 0) {
      return c.json({ message: "No orders found", orders: [] }, 404);
    }

    return c.json({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return c.json(
      { message: "Internal Server Error", error: errorMessage },
      500
    );
  }
};

const getCustomerOrders = async (c: any) => {
  try {
    const customer = c.get("customer");

    console.log(customer);

    if (!customer) {
      return c.json(
        { message: "Unauthorized: Customer not authenticated" },
        401
      );
    }

    // Find all orders belonging to this customer
    const orders = await Order.find({ customer: customer._id });

    if (orders.length === 0) {
      return c.json({ message: "No orders found for this customer" }, 404);
    }

    return c.json(orders);
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return c.json(
      { message: "Internal Server Error", error: errorMessage },
      500
    );
  }
};

const getOrderById = async (c: any) => {
  const { id } = c.req.param();

  try {
    // Find the order belonging to this customer
    const order = await Order.findOne({ _id: id });

    if (!order) {
      return c.json({ message: "Order not found or unauthorized access" }, 404);
    }

    return c.json(order);
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return c.json(
      { message: "Internal Server Error", error: errorMessage },
      500
    );
  }
};

const createOrder = async (c: any) => {
  const body = await c.req.json();

  const {
    products,
    customer,
    address,
    paymentMethod,
    total,
    quantity,
    status,
    date,
  } = body;

  if (
    !products ||
    !customer ||
    !address ||
    !paymentMethod ||
    !total ||
    !quantity ||
    !status ||
    !date
  )
    return c.json({ message: "All fields are required" }, 400);

  const hasCustomer = await Customer.findById(body.customer);

  if (!hasCustomer) {
    return c.json({ message: "Customer not found" }, 404);
  }

  if (products.length === 0) {
    return c.json({ message: "Products are required" }, 400);
  }

  for (const product of products) {
    const hasProduct = await Product.findById(product);

    if (!hasProduct) {
      return c.json({ message: "Product not found" }, 404);
    }
  }

  try {
    const order = new Order({
      ...body,
      customer: hasCustomer,
    });

    const document = await order.save();
    return c.json(document.toObject(), 201);
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return c.json(
      { message: "Internal Server Error", error: errorMessage },
      500
    );
  }
};

const updateOrder = async (c: any) => {
  const { id } = c.req.param();
  const body = await c.req.json();

  const allowedStatus = ["pending", "completed", "cancelled"];

  if (body.status && !allowedStatus.includes(body.status)) {
    return c.json(
      {
        message:
          "Status must be one of the following: pending, completed, delivered",
      },
      400
    );
  }

  try {
    const order = await Order.findById(id);

    if (!order) return c.json({ message: "Order not found" }, 404);

    const document = await Order.findByIdAndUpdate(id, body, { new: true });

    return c.json(document?.toObject(), 200);
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return c.json(
      { message: "Internal Server Error", error: errorMessage },
      500
    );
  }
};

const deleteOrder = async (c: any) => {
  const { id } = c.req.param();

  try {
    const order = await Order.findById(id);

    if (!order) return c.json({ message: "Order not found" }, 404);

    const document = await Order.findByIdAndDelete(id);

    return c.json(document?.toObject(), 200);
  } catch (error) {
    console.log(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return c.json(
      { message: "Internal Server Error", error: errorMessage },
      500
    );
  }
};

export {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getCustomerOrders,
};
