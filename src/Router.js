import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KakaoCallback from './pages/Main/components/KakaoCallback';
import Main from './pages/Main/Main';
import BuyHistory from './pages/BuyHistory/BuyHistory';
import MyPage from './pages/MyPage/MyPage';
import Payment from './pages/Payment/Payment';
import PaymentCompleted from './pages/PaymentCompleted/PaymentCompleted';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ProductList from './pages/ProductList/ProductList';
import RegisterProduct from './pages/RegisterProduct/RegisterProduct';
import SalesEdit from './pages/SalesEdit/SalesEdit';
import SalesHistory from './pages/SalesHistory/SalesHistory';
import SearchModal from './pages/SearchModal/SearchModal';
import SetMyLocation from './pages/SetMyLocation/SetMyLocation';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import ViewSurroundingProducts from './pages/ViewSurroundingProducts/ViewSurroundingProducts';
import Aside from './components/Aside/Aside';
import Footer from './components/Footer/Footer';

const Router = () => {
  return (
    <BrowserRouter>
      <div className="outerContainer">
        <div className="wrap">
          <Aside />
          <div className="container">
            <Routes>
              <Route path="/callback-kakao" element={<KakaoCallback />} />
              <Route path="/" element={<Main />} />
              <Route path="/buyhistory" element={<BuyHistory />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment-completed" element={<PaymentCompleted />} />
              <Route path="/product-detail/:id" element={<ProductDetail />} />
              <Route path="/product-list" element={<ProductList />} />
              <Route path="/register-product" element={<RegisterProduct />} />
              <Route path="/sales-edit" element={<SalesEdit />} />
              <Route path="/sales-history" element={<SalesHistory />} />
              <Route path="/search-modal" element={<SearchModal />} />
              <Route path="/set-my-location" element={<SetMyLocation />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                path="/view-surrounging-products"
                element={<ViewSurroundingProducts />}
              />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default Router;
