import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Guideline from "./pages/Guideline";
import Login from "./pages/Login";
import CreateSpace from "./pages/CreateSpace";
import CreateSpaceSuccessPage from "./pages/CreateSpaceSuccessPage";

import FindEmailForm from "./components/forms/FindEmailForm";
import EmailVerification from "./components/forms/EmailVerification";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="holdup/guideline" element={<Guideline />} />
          <Route path="holdup/signup" element={<Signup />} />
          <Route path="/holdup/find-email" element={<FindEmailForm />} />
          <Route path="/holdup/email-verification" element={<EmailVerification />} />
          <Route path="holdup/login" element={<Login />} />
          <Route path="holdup/spaces" element={<CreateSpace />} />
          <Route path="holdup/reviews" element={<Review/>} />
          <Route path="holdup/spaces/success" element={<CreateSpaceSuccessPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;