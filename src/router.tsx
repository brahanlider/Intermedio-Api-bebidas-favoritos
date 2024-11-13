import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

// import IndexPage from "./views/IndexPage";
const IndexPage = lazy(() => import("./views/IndexPage"));
// import FavoritePage from "./views/FavoritePage";
const FavoritePage = lazy(() => import("./views/FavoritePage"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* outlet  */}
        <Route element={<Layout />}>
          {/* <Route path="/" element={<IndexPage />} index /> */}
          <Route
            path="/"
            element={
              <Suspense fallback="Cargando...">
                <IndexPage />
              </Suspense>
            }
            index
          />

          {/* <Route path="/favoritos" element={<FavoritePage />} /> */}
          <Route
            path="/favoritos"
            element={
              <Suspense fallback="Cargando...">
                <FavoritePage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
