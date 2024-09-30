import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { resetLoginUser, loginSuccess } from "./modules/UserModule"; // 필요한 액션 임포트
import Layout from "./layouts/Layout";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Guideline from "./pages/Guideline";
import Login from "./pages/Login";
import CreateSpace from "./pages/CreateSpace";
import CreateSpaceSuccessPage from "./pages/CreateSpaceSuccessPage";
import Review from "./pages/Review";
import ReviewDetail from "./pages/ReviewDetail";
import FindEmailForm from "./components/forms/FindEmailForm";
import EmailVerification from "./components/forms/EmailVerification";
import CreateReview from "./pages/CreateReview";
import SuccessScreen from "./components/forms/SuccessScreen";
import UpdateReview from "./pages/UpdateReveiw";
import MyPage from "./components/forms/MypageForm";
import Spaces from "./pages/Spaces";

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // 페이지가 로드될 때 세션 스토리지에서 로그인 상태 확인
  //   const isLogin = sessionStorage.getItem("isLogin") === "true";
  //   const user = JSON.parse(sessionStorage.getItem("user"));

  //   if (isLogin && user) {
  //     dispatch(loginSuccess(user)); // 로그인 성공 액션으로 Redux 상태 업데이트
  //   } else {
  //     dispatch(resetLoginUser()); // 상태 초기화
  //   }
  // }, [dispatch]);
  useEffect(() => {
    // 로그인 상태를 sessionStorage 대신 localStorage에 저장
    const isLogin = sessionStorage.getItem("isLogin") === "true";
    const user = JSON.parse(localStorage.getItem("user"));
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

          <Route path="holdup/signup" element={<Signup />} />
          <Route path="holdup/login" element={<Login />} />
          <Route path="holdup/find-email" element={<FindEmailForm />} />
          <Route path="holdup/email-verification" element={<EmailVerification />} />

          <Route path="holdup/reviews" element={<Review />} />
          <Route path="holdup/reviews/create" element={<CreateReview />} />
          <Route path="reviews/:id" element={<ReviewDetail />} />
          <Route path="holdup/spaces" element={<CreateSpace />} />
          <Route path="holdup/reviews/:id" element={<UpdateReview/>} />
          <Route path="holdup/mypage" element={<MyPage />} />
          <Route path="holdup/success" element={<SuccessScreen />} />
          <Route path="holdup/spaces/success" element={<CreateSpaceSuccessPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
