import { useNavigate } from 'react-router-dom';

function MyPageTabs() {
  const navigate = useNavigate();

  const SHOPPING_TABS = [
    {
      id: 1,
      title: '관심상품목록',
      engTitle: 'productsInterest',
    },
    {
      id: 2,
      title: '구매내역',
      engTitle: 'buyHistory',
      onClick: () => navigate('/buyhistory'),
    },
    {
      id: 3,
      title: '판매내역',
      engTitle: 'salesHistory',
      onClick: () => navigate('/sales-history'),
    },
    {
      id: 4,
      title: '후기글',
      engTitle: 'review',
    },
    {
      id: 5,
      title: '문의글',
      engTitle: 'inquiry',
    },
  ];

  const SERVICE_TABS = [
    {
      id: 1,
      title: 'FAQ',
      engTitle: 'faq',
    },
    {
      id: 2,
      title: '공지사항',
      engTitle: 'review',
    },
    {
      id: 3,
      title: '문의하기',
      engTitle: 'qna',
    },
  ];

  return {
    SHOPPING_TABS,
    SERVICE_TABS,
  };
}
export { MyPageTabs };
