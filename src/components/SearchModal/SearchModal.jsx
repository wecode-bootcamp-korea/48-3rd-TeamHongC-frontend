import React, { useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';
import './SearchModal.scss';

const SearchModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState('');

  const onChangeHandler = e => {
    setKeyword(e.target.value);
  };

  const isKeywordValid = keyword === '';

  const goToSearchResult = e => {
    e.preventDefault();
    if (!isKeywordValid) {
      searchParams.set('keyword', keyword);
      navigate(`/search-result?keyword=${keyword}`);
    } else {
      e.target.previousSibling.placeholder = '한 글자 이상 입력해 주세요!';
    }
  };

  return (
    <div className="searchModal">
      <div className="modalBox">
        <p>검색어를 입력하세요.</p>
        <div className="searchInput">
          <input
            type="text"
            className="searchText"
            value={keyword}
            onChange={onChangeHandler}
          />
          <button className="goToSearchResult" onClick={goToSearchResult}>
            검색
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
