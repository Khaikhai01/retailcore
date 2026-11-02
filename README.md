# Duka POS – Point of Sale & Stock Manager

## About the Project

Duka POS is a simple Point of Sale (POS) and Stock Management application built using HTML, CSS, and JavaScript.

The application helps a small shop manage products, monitor stock, and process customer purchases through a shopping cart.

## Features

- Display available products.
- Search products by name.
- Filter products by category.
- Add products to the shopping cart.
- Increase and decrease product quantities.
- Calculate cart subtotal and total.
- Prevent adding products beyond available stock.
- Clear the shopping cart.
- Complete sales and automatically update product stock.
- Identify products with low or no stock.

## Technologies Used

- **HTML5** – Structures the application.
- **CSS3** – Styles the application.
- **JavaScript (ES6)** – Handles application logic and DOM manipulation.

## Project Structure

```text
Duka-POS/
│
├── index.html
│
├── styles/
│   └── styles.css
│
├── src/
│   └── app.js
│
└── README.md
```

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Open the Project

Navigate to the project folder using your code editor, preferably Visual Studio Code.

### 3. Run the Application

Open `index.html` in your web browser.

You can also use the Live Server extension in Visual Studio Code to run the application.

## How It Works

The application uses JavaScript classes to organise its functionality:

- **Product:** Manages product details and stock.
- **CartItem:** Represents individual products added to the shopping cart.
- **Cart:** Manages cart operations, including adding, removing, and updating product quantities.

DOM manipulation is used to dynamically display products, update the shopping cart, and respond to user interactions.

## Current Limitations

- Product data is stored in JavaScript and resets when the page is refreshed.
- Sales records are not permanently stored.
- The application does not yet have a database or backend integration.
- Payment processing is not yet implemented.

## Future Improvements

- Add local storage or database integration.
- Generate customer receipts.
- Add sales history and reports.
- Implement user authentication.
- Add payment management.
- Improve stock management functionality.

## Author

Developed as a learning project to practise JavaScript, object-oriented programming, and DOM manipulation.

