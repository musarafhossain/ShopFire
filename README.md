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