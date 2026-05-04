import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage";
import AddProductPage from "../pages/AddPage";
import ViewProductPage from "../pages/ViewPage";
import NotFoundPage from "../pages/NotFound";
import EditProductPage from "../pages/EditPage";
import ProductDetailPage from "../pages/DetailPage";
import CartPage from "../pages/CartPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: HomePage },
            { path: "add-product", Component: AddProductPage },
            { path: "view-products", Component: ViewProductPage },
            { path: "edit-product/:id", Component: EditProductPage },
            { path: "product-detail/:id", Component: ProductDetailPage },
            { path: "cart", Component: CartPage },
            { path: "*", Component: NotFoundPage }
        ],
    },
]);