## 1️⃣ What is the difference between `var`, `let`, and `const`?

### `var`
- Function scoped  
- Can be **redeclared** and **updated**  
- Used in older JavaScript versions (before ES6)

### `let`
- Block scoped  
- Can be **updated**, but **cannot be redeclared** in the same scope  
- Introduced in **ES6**

### `const`
- Block scoped  
- **Cannot be updated or redeclared**  
- Must be assigned a value when declared  

---

## 2️⃣ What is the Spread Operator (`...`)?

The **spread operator (`...`)** in JavaScript is used to **expand or spread elements** of an array or object.

It allows us to **copy, merge, or pass multiple values easily**.

---

## 3️⃣ What is the difference between `map()`, `filter()`, and `forEach()`?

`map()`, `filter()`, and `forEach()` are JavaScript array methods used to work with elements of an array.

### `map()`
- Used to **transform each element** of an array  
- Returns a **new array**  
- The length of the new array is the **same as the original array**

### `filter()`
- Used to **select elements based on a condition**  
- Returns a **new array**  
- The new array may contain **fewer elements**

### `forEach()`
- Used to **execute a function for each element**  
- **Does not return a new array**  
- Mainly used for side effects like **logging or updating values**

---

## 4️⃣ What is an Arrow Function?

An **arrow function** is a shorter and cleaner way to write functions in JavaScript.

It was introduced in **ES6 (ECMAScript 2015)** and is commonly used in modern JavaScript.

Arrow functions use the **`=>` syntax** and make code more concise.

---

## 5️⃣ What are Template Literals?

**Template literals** are a way to create strings in JavaScript using **backticks (` `)** instead of single (`' '`) or double (`" "`) quotes.

They were introduced in **ES6** and allow us to **embed variables and expressions inside strings** using `${}`.