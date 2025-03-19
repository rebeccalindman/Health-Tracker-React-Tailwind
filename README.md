# Healthtracker-v10

**Healthtracker-v10** is a web-based application designed to help users track and monitor various health aspects.  
The project utilizes modern web development tools such as **Vite** and **Tailwind CSS** to provide a fast, responsive, and modular development environment.

---

## 📌 Features
- **Health Tracking:** Log and monitor weight, blood pressure, sleep, and other health indicators.
- **Responsive Design:** Built with **Tailwind CSS** to ensure a mobile-friendly and fully responsive layout.
- **Modern Development Environment:** Uses **Vite** for fast refreshes and an improved development experience.
- **Modular Architecture:** Designed with a clear folder structure, making it easy to extend and maintain.

---

## 🚀 Installation
Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BenjaminBerhane/Healthtracker-v10.git
   cd Healthtracker-v10


2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will run locally (typically on http://localhost:5173 or another specified port)

## ⚙️ Building for Production
To generate an optimized production build, run:

```bash
npm run build
```
This command will create a production-ready version in the dist folder.

## Common Issues & Troubleshooting

**PostCSS-related errors**

If you encounter PostCSS errors, try the following:

1. Installera nödvändigt postCSS-tillägg:
   ```bash
   npm install -D @tailwindcss/postcss
   ```
2. Starta om utvecklingsservern:
   ```bash
   npm run dev
   ```


## Contributing

Contributions are always welcome! Follow these steps to contribute:

1. **Fork** the repository.
2. Create a **new branch** for your feature or bug fix.
3. Submit a **pull request** with a detailed description of your changes.

## 📜 License
This repository does not currently specify a license.
For licensing information, please contact the repository owner.

## Support

If you have any questions or need assistance, feel free to **open an issue** in the repository.


# Accessibility & User Experience

## 🚀 Custom Form Validation

### ❓ Why Custom Validation?
By default, browsers only highlight **one missing field at a time** when using the `required` attribute. However, we want users to **see all missing fields at once** when they attempt to submit the form. This improves user experience by making it clear which fields need attention.

To achieve this, we **disabled native browser validation** (`noValidate` on `<form>`) and implemented our own validation logic.

---

### 🔍 How It Works
- When the user clicks **submit**, all required fields are checked.
- If a required field is **empty**, it is outlined in **red** and an error message appears.
- If the user enters a value, the red border disappears instantly.
- Once all required fields are filled, the form submits successfully.

---

### ✅ Expected Behavior
1. **Before submission:**  
   - The form looks normal.
   
2. **After clicking submit with missing fields:**  
   - All missing required fields turn **red**.
   - An error message appears under each missing field.

3. **When fixing an error:**  
   - As soon as the user enters a value, the **red border disappears**.

4. **After fixing all errors and clicking submit:**  
   - The form submits successfully.



