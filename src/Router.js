import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KakaoCallback from './pages/Main/components/KakaoCallback';
import Main from './pages/Main/Main';
import BuyHistory from './pages/BuyHistory/BuyHistory';
import MyPage from './pages/MyPage/MyPage';
import ProfileEdit from './pages/ProfileEdit/ProfileEdit';
import Payment from './pages/Payment/Payment';
import PaymentCompleted from './pages/Payment/PaymentCompleted/PaymentCompleted';
import PaymentRedirect from './pages/Payment/PaymentRedirect/PaymentRedirect';
import PaymentFailed from './pages/Payment/PaymentFailed/PaymentFailed';
import PaymentCancel from './pages/Payment/PaymentCancel/PaymentCancel';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ProductList from './pages/ProductList/ProductList';
import RegisterProduct from './pages/RegisterProduct/RegisterProduct';
import SalesEdit from './pages/SalesEdit/SalesEdit';
import SalesHistory from './pages/SalesHistory/SalesHistory';
import SearchResult from './pages/SearchResult/SearchResult';
import SetMyLocation from './pages/SetMyLocation/SetMyLocation';
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
              <Route path="/profileEdit" element={<ProfileEdit />} />
              <Route path="/payment/:id" element={<Payment />} />
              <Route path="/payment-completed" element={<PaymentCompleted />} />
              <Route path="/payment-redirect" element={<PaymentRedirect />} />
              <Route path="/payment-failed" element={<PaymentFailed />} />
              <Route path="/payment-cancel" element={<PaymentCancel />} />
              <Route path="/product-detail/:id" element={<ProductDetail />} />
              <Route path="/product-list" element={<ProductList />} />
              <Route path="/register-product" element={<RegisterProduct />} />
              <Route path="/sales-history" element={<SalesHistory />} />
              <Route path="/search-result" element={<SearchResult />} />
              <Route path="/set-my-location" element={<SetMyLocation />} />
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
