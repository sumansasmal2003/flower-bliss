// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider (e.g., Gmail, Outlook, etc.)
  auth: {
    user: 'sasmalsuman04@gmail.com', // Your email address
    pass: 'tfas eifc trzz knhu', // Your email password or app-specific password
  },
});

// Test transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Error with transporter:', error);
  } else {
    console.log('Mail server is ready to take messages:', success);
  }
});

// Route for sending order confirmation email
app.post('/send-order-email', async (req, res) => {
  const {
    email,
    name,
    flowerName,
    quantity,
    totalPrice,
    deliveryDate,
    deliveryTime,
    orderId,
    priceUnit
  } = req.body;

  if (!email || !orderId) {
    return res.status(400).json({ message: 'Email and Order ID are required.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to: email, // Recipient's email address
    subject: `Order Confirmation - Tracking ID: ${orderId}`,
    html: `
      <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
        <h1 style="color: #333; text-align: center;">Thank You for Your Order, ${name}!</h1>
        <p style="color: #555; font-size: 16px;">We have received your order and are now processing it. Below are the details of your purchase:</p>
        <ul style="list-style-type: none; padding: 0;">
          <li style="background-color: #fff; margin-bottom: 10px; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <strong style="color: #333;">Flower Name:</strong> ${flowerName}
          </li>
          <li style="background-color: #fff; margin-bottom: 10px; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <strong style="color: #333;">Quantity:</strong> ${quantity} ${priceUnit}
          </li>
          <li style="background-color: #fff; margin-bottom: 10px; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <strong style="color: #333;">Total Price:</strong> ₹${totalPrice}
          </li>
          <li style="background-color: #fff; margin-bottom: 10px; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <strong style="color: #333;">Delivery Date:</strong> ${deliveryDate}
          </li>
          <li style="background-color: #fff; margin-bottom: 10px; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <strong style="color: #333;">Delivery Time:</strong> ${deliveryTime}
          </li>
          <li style="background-color: #fff; margin-bottom: 10px; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <strong style="color: #333;">Pickup the delivery from:</strong> Sijgeria hospital ground
          </li>
          <li style="background-color: #fff; margin-bottom: 10px; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <strong style="color: #333;">Tracking ID:</strong> ${orderId}
          </li>
        </ul>
        <p style="color: #555; font-size: 16px;">Use the tracking ID to monitor your order's progress.</p>
        <p style="color: #555; font-size: 16px;">If you have any questions or need further assistance, feel free to contact us
        <p style="color: #555; font-size: 16px;">Thank you for choosing our services! We look forward to serving you again.</p>
      </div>
    `,
  };


  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Order confirmation email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send order confirmation email.' });
  }
});
// Route for sending order confirmation email
app.post('/send-order-status-email', async (req, res) => {
  const {
    email,
    name,
    flowerName,
    quantity,
    totalPrice,
    deliveryDate,
    deliveryTime,
    orderId,
    status
  } = req.body;

  if (!email || !orderId) {
    return res.status(400).json({ message: 'Email and Order ID are required.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to: email, // Recipient's email address
    subject: `Order Status - Tracking ID: ${orderId}`,
    html: `
      <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
        <h1 style="color: #333; text-align: center;">Thank You for Your Order, ${name}!</h1>
        <p style="color: #555; font-size: 16px;">Your Order's status is changed to ${status}</p>
        <ul style="list-style-type: none; padding: 0;">
          <li style="background-color: #fff; margin-bottom: 10px; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <strong style="color: #333;">Flower Name:</strong> ${flowerName}
          </li>
          <li style="background-color: #fff; margin-bottom: 10px; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <strong style="color: #333;">Quantity:</strong> ${quantity} kg
          </li>
          <li style="background-color: #fff; margin-bottom: 10px; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <strong style="color: #333;">Total Price:</strong> ₹${totalPrice}
          </li>
          <li style="background-color: #fff; margin-bottom: 10px; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <strong style="color: #333;">Delivery Date:</strong> ${deliveryDate}
          </li>
          <li style="background-color: #fff; margin-bottom: 10px; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <strong style="color: #333;">Delivery Time:</strong> ${deliveryTime}
          </li>
          <li style="background-color: #fff; margin-bottom: 10px; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <strong style="color: #333;">Pickup the delivery from:</strong> Sijgeria hospital ground
          </li>
          <li style="background-color: #fff; margin-bottom: 10px; padding: 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <strong style="color: #333;">Tracking ID:</strong> ${orderId}
          </li>
        </ul>
        <p style="color: #555; font-size: 16px;">Use the tracking ID to monitor your order's progress.</p>
        <p style="color: #555; font-size: 16px;">If you have any questions or need further assistance, feel free to contact us
        <p style="color: #555; font-size: 16px;">Thank you for choosing our services! We look forward to serving you again.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Order confirmation email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send order confirmation email.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
