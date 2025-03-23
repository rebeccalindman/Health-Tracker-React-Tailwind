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


# ♿ Accessibility & User Experience
## ✅ Inclusive Form Validation
To support a smoother and more accessible experience, this app uses custom validation patterns that:
  * Clearly prevent form submission until all required fields are filled
  * Guide the user with subtle, immediate visual feedback
  * Avoid relying solely on native browser alerts or one-field-at-a-time validation

## 💡 Key Behaviors
- The Submit button is disabled until all required inputs are filled
- Inputs are marked as required in the UI
- There is no native browser validation pop-up (noValidate is set on the <form>)
- Users receive real-time feedback as they type
- Focus remains on clean UX without overwhelming the user with error messages

🧠 Why This Matters
- Native browser validation highlights only one missing field at a time, which can confuse users
- By disabling the submit button, users know instantly when the form is ready to go
- Color, spacing, and logical grouping improve the experience for users with cognitive or visual impairments

## 🧩 Icon-Based Visual Cues
All key action buttons include icons alongside text to support:
- Users with color blindness or low contrast sensitivity
- Faster visual scanning (e.g. checkmark = submit, X = cancel, etc.)
- Better mobile and keyboard usability

## 🧪 Bonus UX Improvements
- Success messages appear after saving profile info to provide confirmation
- TDEE preview updates live, giving immediate feedback based on form inputs
- Weight input is auto-filled with the most recent logged weight, making form completion easier
- The form is optimized for keyboard use and responsive on all screen sizes



# 🔄 Changelog – Recent Improvements

## 🟩 Weight Tracking Feature
- ✅ Added interactive weight chart using Recharts and Shadcn/UI
- ✅ Custom tooltip displays both date and weight
- ✅ Chart auto-updates with new Redux data
- ✅ Filters data to the latest April–March year

## 🟦 Redux & State Management
- ✅ Created dedicated `weightSlice` for `weightHistory`
- ✅ Refactored to use Redux Toolkit actions (add, edit, remove weight)
- ✅ Connected chart and profile form to Redux
- ✅ Synced profile, meals, and weight to `localStorage`

## 🟨 Local Storage Refactor
- ✅ Modular, type-safe `localStorage.ts` utility
- ✅ Removed duplicated logic
- ✅ Centralized keys and fallback values

## 🟧 Profile Form Improvements
- ✅ Created `ProfileFormData` type (`Omit<Profile, "tdee">`)
- ✅ Handled age-from-birthdate conversion
- ✅ Dynamic TDEE preview
- ✅ Pre-filled weight field from Redux `weightSlice`
- ✅ Submits both profile and weight together
- ✅ Displays success message on save

## 🧪 Bonus Wins
- 🧹 Removed outdated `weight[]` from profile
- 🧩 Used `useMemo` and `useEffect` to optimize logic
- 💬 Added real-time form feedback
- 🚀 Set up for future features like weight editing/exporting

## ♿ Accessibility & UX
- 🧩 Custom Form Validation
  - By default, browsers only highlight one invalid field at a time. We wanted users to see all missing fields at once for better UX.
  - ✅ Disabled native validation (`noValidate`)
  - ✅ Built custom logic to check all required fields
  - ✅ Displays red outlines and error messages for all invalid fields
  - ✅ Errors disappear instantly once fixed

