# ShopFire
This is an ecommerce application built on react.

---

# Project Setup

### **Step 1 : Create a new react project using vite js**

```jsx
npm create vite@latest
```

### **Step 2 : Install npm**

```jsx
npm i
```

### **Step 3 :** Install tailwind Css

1. **Install tailwindcss and @tailwindcss/vite via npm.**

```jsx
npm install tailwindcss @tailwindcss/vite
```

2. **Configure the Vite plugin**

Add the `@tailwindcss/vite` plugin to your Vite configuration.

```jsx
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
})

```

3. **Import Tailwind CSS**

Add an @import to your CSS file (./src/index.css) that imports Tailwind CSS.

```css
@import "tailwindcss";
```

4. **Run your build process with npm run dev.**

```jsx
npm run dev
```

5. **Start using Tailwind in your HTML**

Make sure your compiled CSS is included in the `<head>` (your framework might handle this for you), then start using Tailwind’s utility classes to style your content.

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/src/styles.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

---

# Folder Structure

Create a some Folder

```jsx
  - src
    - components
    - context
    - pages
    - redux
    - firebase
```

## **Step 1 : Create a Navbar Folder**

```jsx
  - components
  - navbar
    - Navbar.jsx
```

```jsx
import React from 'react'

const Navbar = () => {
  return (
    <div>Navbar</div>
  )
}

export default Navbar
```

## **Step 2 : Create a Footer Folder**

```jsx
  - components
  - footer
    - Footer.jsx
```

```jsx
import React from 'react'

function Footer() {
  return (
    <div>Footer</div>
  )
}

export default Footer
```

## **Step 3 : Create a Layout Folder**

```jsx
  - components
  - layout
    - Layout.jsx
```

**`Layout.jsx`**

```jsx
import React from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
```

## **Step 4 : Create a Page**

```jsx
  - pages
    - home
      - Home.jsx
    - allproducts
      - AllProducts.jsx
    - Order
      - Order.jsx
    - cart
      - Cart.jsx
    - admin
      - dashboard
        - Dashboard.jsx
    - nopage
      - NoPage.jsx
```

**`Home.jsx`**

```jsx
import React from 'react'

function Home() {
  return (
    <div>Home</div>
  )
}

export default Home
```

## **Step 5 : Import Layout in Home.jsx**

```jsx
import React from 'react'
import Layout from '../../components/layout/Layout'

function Home() {
  return (
    <Layout>Home</Layout>
  )
}

export default Home
```

## **Step 6 : Create a route of all page**

### Install React router dom for routing

```jsx
npm i react-router-dom
```

### **Define routes in App.jsx**

**Import `BrowserRouter as Router`, `Route`, `Routes`, from react-router-dom**

```jsx
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
```

## Complete Code

```jsx
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/*" element={<NoPage/>} />
      </Routes>
    </Router>
  )
}

export default App
```