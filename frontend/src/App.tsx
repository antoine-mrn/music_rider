import { Routes } from "react-router";
import Home from "./pages/Home";
import { Route } from "react-router";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Layout from "./components/layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Profile from "./pages/profile/Profile";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile/:id" element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </QueryClientProvider>
    );
}

export default App;
