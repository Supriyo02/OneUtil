import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddService from "./pages/addService";
import { useAppContext } from "./contexts/AppContext";
import MyServices from "./pages/MyServices";
import EditService from "./pages/EditService";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />

        <Route
          path="/search"
          element={
            <Layout>
              <p>Search Page</p>
            </Layout>
          }
        />

        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />

        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/add-service"
              element={
                <Layout>
                  <AddService />
                </Layout>
              }
            />

            <Route
              path="/edit-service/:serviceId"
              element={
                <Layout>
                  <EditService />
                </Layout>
              }
            />

            <Route
              path="/my-services"
              element={
                <Layout>
                  <MyServices />
                </Layout>
              }
            />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
