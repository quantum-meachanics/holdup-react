import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { loginSuccess, resetLoginUser } from "./modules/UserModule"; // 필요한 액션 임포트

import MyPage from "./pages/Mypage";
import SuccessScreen from "./components/forms/SuccessScreen";
import Layout from "./layouts/Layout";
import CreateSpace from "./pages/CreateSpace";
import CreateSpaceSuccessPage from "./pages/CreateSpaceSuccessPage";
import Guideline from "./pages/Guideline";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Review from "./pages/Review";
import ReviewDetail from "./pages/ReviewDetail";
import FindEmailForm from "./components/forms/FindEmailForm";
import EmailVerification from "./components/forms/EmailVerification";
import CreateReview from "./pages/CreateReview";
import Spaces from "./pages/Spaces";
import CreditPage from "./components/forms/CreditPage";
import SpaceDetail from "./pages/SpaceDetail";
import Signup from "./pages/Signup";
import CreateReservation from "./pages/CreateReservation";
import UpdateReview from "./pages/UpdateReview";
import Inquiry from "./pages/Inquiry";
import CreateInquiry from "./pages/CreateInquiry";
import InquiryDetail from "./pages/InquiryDetail";
import UpdateInquiry from "./pages/UpdateInquiry";
import Report from "./pages/Report";
import CreateReport from "/pages/CreateReport";
import ReportDetail from "/pages/ReportDetail";
import UpdateReport from "/pages/UpdateReport";
import Administrator from "/pages/Administrator";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 로그인 상태를 sessionStorage 대신 localStorage에 저장
    const isLogin = sessionStorage.getItem("isLogin") === "true";
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");

    // 로그인 상태와 유저 정보가 모두 있을 때만 Redux 상태 업데이트
    if (isLogin && user && token) {
      dispatch(loginSuccess(JSON.parse(user)));
    } else if (!user || !isLogin) {
      // 유저 정보가 없거나 로그인이 아닌 경우만 상태 초기화
      dispatch(resetLoginUser());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />

          <Route path="holdup/guideline" element={<Guideline />} />
          <Route path="holdup/spaces" element={<Spaces />} />
          <Route path="holdup/createSpace" element={<CreateSpace />} />
          <Route path="holdup/spaces/success" element={<CreateSpaceSuccessPage />} />
          <Route path="holdup/spaces/:id" element={<SpaceDetail />} />

          <Route path="holdup/signup" element={<Signup />} />
          <Route path="holdup/login" element={<Login />} />
          <Route path="holdup/find-email" element={<FindEmailForm />} />
          <Route path="holdup/email-verification" element={<EmailVerification />} />
          <Route path="holdup/success" element={<SuccessScreen />} />

          <Route path="holdup/reviews" element={<Review />} />
          <Route path="holdup/reviews/create" element={<CreateReview />} />
          <Route path="holdup/reviews/:id" element={<ReviewDetail />} />
          <Route path="holdup/reviews/update/:id" element={<UpdateReview/>} />

          <Route path="holdup/createReservation" element={<CreateReservation />} />

          <Route path="holdup/inquiries" element={<Inquiry/>}/>
          <Route path="holdup/inquiries/create" element={<CreateInquiry/>}/>
          <Route path="holdup/inquiries/:id" element={<InquiryDetail/>}/>
          <Route path="holdup/inquiries/update/:id" element={<UpdateInquiry/>}/>

          <Route path="holdup/reports" element={<Report/>}/>
          <Route path="holdup/reports/create" element={<CreateReport/>}/>
          <Route path="holdup/reports/:id" element={<ReportDetail/>}/>
          <Route path="holdup/reports/update/:id" element={<UpdateReport/>}/>

          <Route path="holdup/mypage" element={<MyPage />} />
          <Route path="holdup/mypage/credit" element={<CreditPage/>}/>

          <Route path="holdup/admin" element={<Administrator/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
