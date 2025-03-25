import { createRoot } from "react-dom/client"; // ✅ Import createRoot correctly
import router from "./router/routes.js";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";

createRoot(document.getElementById("root")!).render( // ✅ Use `createRoot` correctly
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
