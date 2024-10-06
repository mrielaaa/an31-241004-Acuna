// Acuña, Mariel S.
// Problem: Dynamic Smart Inventory Management
// 241004 - Main Activity

const storeName = 'Sari-Sari', storeLocation = 'New York', storeCapacity = 500;
let products = [
  {
    name: 'Laptop',
    price: 18999,
    quantity: 50
  },
  {
    name: 'Smartphone',
    price: 9999,
    quantity: 100
  },
  {
    name: 'Tablet',
    price:12999,
    quantity: 80
  } 
];


function checkInventoryCapacity() {
  // initializes variable that stores total quantity of products
  let totalQuantity = 0;

  // forEach loop to iterate through all the products then add their quantity to totalQuantity  
  products.forEach((element) => totalQuantity += element.quantity);

  // conditional statements to check if totalQuantity exceeds storeCapacity
  if (totalQuantity > storeCapacity) {
    console.log("Warning: Store is over capacity!\nTotal quantity: " + totalQuantity + " / " + storeCapacity);
    return false;
  } 
  else if (totalQuantity == storeCapacity) {
    console.log("Store has reached capacity.\nTotal quantity: " + totalQuantity + " / " + storeCapacity);
    return false;
  }
  else {
    console.log("Store is within capacity.\nTotal quantity: " + totalQuantity + " / " + storeCapacity);
    return true;
  }
}


function addProduct(productName, price, quantity) {
  // conditional statements to check capacity before adding product
  if (checkInventoryCapacity() == true) {
    productName = prompt("Enter the product name:");
    price = parseFloat(prompt("Enter the price:"));
    quantity = parseInt(prompt("Enter the quantity:"));
    
    // create a new product object
    let newProduct = {
      name: productName,
      price: price,
      quantity: quantity
    };
    
    // add the new products into the products[] array
    products.push(newProduct);
    console.log("Added new product: " + newProduct.name);
    products.forEach((element) => console.log(element));
    checkInventoryCapacity();
  } 
  else {
    checkInventoryCapacity();
  }
}


function checkProductName() {
  let productName;
  
  // while loop that repeats prompt
  while (true) {
    productName = prompt("Enter the product you'd like to remove: ");
    // for loop to iterate through product names
    for (let i = 0; i < products.length; i++) {
      // if statement that lets the user break out of while loop when conditions meet
      if (productName === products[i].name) {
        return productName;
      }
    }
    console.log("Product not found. Please try again.");
  }
}


function checkQuantity() {
  let quantity;

  // while loop that repeats prompt
  while (true) {
    quantity = prompt("Enter the quantity: ");
    
    // for loop to iterate through product quantity
    for (let i = 0; i < products.length; i++) {
      // if statement that lets the user break out of while loop when conditions meet
      if (quantity <= products[i].quantity) {
        return quantity;
      }
    }
    console.log("Quantity is greater than available product. Please try again.");
  }
}


function removeProduct(productName, quantity) {
  // for loop to iterate through products
  for (let i = 0; i < products.length; i++) {
    // conditional statement to see if input matches any product names
    if (products[i].name === productName) {
      products[i].quantity -= quantity;
      console.log("Removed " + quantity + " pieces of " + productName);
      
      products.forEach((element) => console.log(element));
      checkInventoryCapacity();
      restockProduct(productName);
      return;
    }
  }
  console.log(productName + " does not match any of our products.");
}


function getMostExpensiveProduct() {
  // initializes variables to store the first element of products[] name and price
  let mostExpensivePrice = products[0].price;
  let mostExpensiveName = products[0].name;

  // for loop to iterate through the products[] array excluding the first element
  for (let i = 1; i < products.length; i++) {
    // conditional statement to replace the variables when conditions meet
    if (mostExpensivePrice < products[i].price) {
      mostExpensivePrice = products[i].price;
      mostExpensiveName = products[i].name;
    }
  }
  return mostExpensiveName;
}


function calculateTotalInventoryProducts() {
  // initializes variable that stores total number of the products
  let totalProducts = 0;

  // forEach loop to add every product's quantity to totalProduct
  products.forEach((element) => totalProducts += element.quantity);
  return totalProducts;
}


function calculateTotalInventoryValue() {
  // initializes variable that stores total value of the products
  let totalValue = 0;

  // forEach loop to add every product's price times their quantity to totalValue
  products.forEach((element) => totalValue += (element.price * element.quantity));
  return totalValue;
}


function restockProduct(productName) {
  const threshold = 5;

  // for loop to iterate through products[]
  for (let i = 0; i < products.length; i++) {
    // sees which product productName matches 
    if (productName === products[i].name) {
      // restocking if below threshold
      if (products[i].quantity < threshold ) {
        products[i].quantity += 20;
      }
    }
  }
  console.log(productName + " has fallen below threshold! Restocking...");
  products.forEach((element) => console.log(element));
  checkInventoryCapacity();
}




// MAIN PROGRAM

// forEach loop that iterates through products[] to display
products.forEach((element) => console.log(element));

// while loop that repeats a question
while (true) {
  userAdd = prompt("Would you like to add a product? (y/n) ");
  
  // conditional statement to check if answer is positive (y/Y)
  if (userAdd === 'y' || userAdd === 'Y') {
    addProduct();
    break;
  }
  // conditional statement to check if answer is negative (n/N)
  else if (userAdd === 'n' || userAdd === 'N') {
    break;
  }
  // conditional statement that goes back to loop if answer is invalid
  else {
    console.log("Invalid answer, please try again.");
  }
}


// while loop that repeats a question
while (true) {
  userRemove = prompt("Would you like to remove a product? (y/n) ");

  // conditional statement to check if answer is positive (y/Y)
  if (userRemove === 'y' || userRemove === 'Y') {
    let productName = checkProductName();
    let quantity = checkQuantity();
    removeProduct(productName, quantity);
    break;
  }
  // conditional statement to check if answer is negative (n/N)
  else if (userRemove === 'n' || userRemove === 'N') {
    break;
  }
  // conditional statement that goes back to loop if answer is invalid
  else {
    console.log("Invalid answer, please try again.");
  }
}


console.log("Store Name: " + storeName);
console.log("Store Location: " + storeLocation);
console.log("Total Number of Products: " + calculateTotalInventoryProducts());
console.log("Total Inventory Value: " + calculateTotalInventoryValue());
console.log("Most Expensive Product: " + getMostExpensiveProduct());
console.log(checkInventoryCapacity());


