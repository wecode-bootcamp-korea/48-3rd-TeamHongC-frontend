import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import NavBack from '../../components/Nav/NavBack';
import Button from '../../components/Button/Button';
import { CATECORY_TABS, CONDITION_TABS } from './data/RegisterCategory';
import './RegisterProduct.scss';

function errorInputChange(event, setInputValue, setErrorMessage) {
  const inputValue = event.target.value;
  const numericValue = inputValue.replace(/[^0-9]/g, '');
  const numberCommaValue = inputValue.replace(/[^\d,]/g, '');
  const formattedValue = Number(numericValue).toLocaleString('ko-KR');

  setInputValue(formattedValue);

  if (inputValue !== numberCommaValue) {
    setErrorMessage('*숫자만 입력해주세요.*');
  } else {
    setErrorMessage('');
  }
}

export default function RegisterProduct() {
  const [searchParams] = useSearchParams();
  const [priceErrorMessage, setPriceErrorMessage] = useState('');
  const [quantityErrorMessage, setQuantityErrorMessage] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [inputData, setInputData] = useState({
    title: '',
    price: '',
    quantity: '',
    textarea: '',
  });
  const [toggleCategory, setToggleCategory] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedItemCondition, setSelectedItemCondition] = useState('');

  const navigate = useNavigate();
  const xValue = searchParams.get('x');
  const yValue = searchParams.get('y');
  const region = searchParams.get('region');

  const formData = new FormData();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handlePriceChange = event => {
    errorInputChange(
      event,
      value => setInputData({ ...inputData, price: value }),
      setPriceErrorMessage,
    );
  };

  const handleQuantityChange = event => {
    errorInputChange(
      event,
      value => setInputData({ ...inputData, quantity: value }),
      setQuantityErrorMessage,
    );
  };

  const inputValidation =
    Object.values(inputData).some(value => value.trim() === '') ||
    imagePreviews.every(image => image === '') ||
    selectedCategoryId === '' ||
    selectedItemCondition === '' ||
    inputData.price === '0' ||
    inputData.quantity === '0';

  const handleImageUpload = event => {
    const files = event.target.files;
    const updatedImagePreviews = [...imagePreviews];

    if (
      updatedImagePreviews.filter(preview => preview !== '').length +
        files.length >
      3
    ) {
      alert('이미지는 최대 3개까지 업로드할 수 있습니다.');
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = e => {
        const imageUrl = e.target.result;
        if (updatedImagePreviews.includes(imageUrl)) {
          alert('이미 중복된 이미지가 있습니다.');
        } else {
          for (let j = 0; j < updatedImagePreviews.length; j++) {
            if (updatedImagePreviews[j] === '') {
              updatedImagePreviews[j] = imageUrl;
              setImagePreviews(updatedImagePreviews);
              formData.append(`image${j + 1}`, file);
              return;
            }
          }
          updatedImagePreviews.push(imageUrl);
          setImagePreviews(updatedImagePreviews);
          formData.append(`image${updatedImagePreviews.length}`, file);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = index => {
    const updatedImagePreviews = [...imagePreviews];
    updatedImagePreviews[index] = '';
    setImagePreviews(updatedImagePreviews);
  };

  const goToProductList = async () => {
    if (inputValidation) {
      alert('항목 모두 필수입니다.');
    } else if (window.confirm('등록 완료! 메인페이지로 이동하시겠습니까?')) {
      try {
        const formData = new FormData();

        for (let i = 0; i < imagePreviews.length; i++) {
          const imageUrl = imagePreviews[i];
          const response = await axios.get(imageUrl, { responseType: 'blob' });
          const blob = response.data;
          formData.append('image', blob, `image${i + 1}.jpg`);
        }
        formData.append('longitude', xValue);
        formData.append('latitude', yValue);
        formData.append('region', region);
        formData.append('title', inputData.title);
        formData.append('price', inputData.price);
        formData.append('itemCount', inputData.quantity);
        formData.append('itemDescription', inputData.textarea);
        formData.append('categoryId', selectedCategoryId);
        formData.append('itemCondition', selectedItemCondition);

        const response = await axios.post(
          'http://10.58.52.167:3000/item',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              authorization: localStorage.getItem('token'),
            },
          },
        );
        const result = await response.data;

        navigate('/product-list');
      } catch (error) {
        alert('죄송합니다. 상품 등록에 실패했습니다.');
        console.error(error);
      }
    }
  };

  return (
    <div className="registerProduct">
      <NavBack title="상품등록" />
      <div className="registerProductWrap">
        <div class="imgContents">
          <div class="uploadBox">
            <label for="imgInput">
              <img src="/images/upload-box.png" alt="이미지 업로드 아이콘" />
              <p>사진등록</p>
            </label>
            <input
              id="imgInput"
              type="file"
              name="image"
              accept="image/*"
              required
              multiple
              onChange={handleImageUpload}
            />
          </div>
          <div className="imgPreviewsContainer">
            {imagePreviews.map((preview, index) =>
              preview ? (
                <div className="imgPreview" key={index}>
                  <img
                    className="preview"
                    src={preview}
                    alt="미리보기 이미지"
                  />
                  <img
                    className="remove"
                    src="/images/remove.png"
                    alt="이미지 삭제 버튼"
                    onClick={() => handleImageRemove(index)}
                  />
                </div>
              ) : null,
            )}
          </div>
        </div>
        <div className="registerProductInput">
          <div className="productTitle">
            <h2>제목</h2>
            <input
              type="text"
              name="title"
              value={inputData.title}
              onChange={handleInputChange}
              placeholder="상품명"
            />
          </div>
          <div className="categoryBtn">
            <div className="category">
              <ul>
                {CATECORY_TABS.map(category => (
                  <li
                    key={category.categoryId}
                    onClick={() => {
                      setToggleCategory(true);
                      setSelectedCategoryId(category.categoryId);
                    }}
                  >
                    <div
                      className={
                        selectedCategoryId === category.categoryId
                          ? 'selected'
                          : 'notSelect'
                      }
                    >
                      {category.categoryName}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {toggleCategory && (
              <div className="itemCondition">
                <ul>
                  {CONDITION_TABS.map(condition => (
                    <li
                      key={condition.itemCondition}
                      onClick={() => {
                        setSelectedItemCondition(condition.itemCondition);
                      }}
                    >
                      <div
                        className={
                          selectedItemCondition === condition.itemCondition
                            ? 'selected'
                            : 'notSelect'
                        }
                      >
                        {condition.conditionName}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="priceInput">
            <div>
              <h2>판매 금액</h2>
              {priceErrorMessage && <p>{priceErrorMessage}</p>}
            </div>
            <div className="inputWithSuffix">
              <input
                type="text"
                name="price"
                placeholder="ex) 10000"
                value={inputData.price}
                onChange={event => {
                  handleInputChange(event);
                  handlePriceChange(event);
                }}
              />
              <span> 원</span>
            </div>
          </div>
          <div className="quantityInput">
            <div>
              <h2>재고 수량</h2>
              {quantityErrorMessage && <p>{quantityErrorMessage}</p>}
            </div>
            <div className="inputWithSuffix">
              <input
                type="text"
                name="quantity"
                placeholder="ex) 30"
                value={inputData.quantity}
                onChange={event => {
                  handleInputChange(event);
                  handleQuantityChange(event);
                }}
              />
              <span> 개</span>
            </div>
          </div>
          <div>
            <h2>상품설명</h2>
            <textarea
              name="textarea"
              value={inputData.textarea}
              onChange={handleInputChange}
              placeholder="상품 설명을 입력해 주세요."
            ></textarea>
          </div>
        </div>
        <div className="registerBtn">
          <Button
            className={inputValidation ? 'greenBtnDisabled' : 'greenBtn'}
            text="등록"
            onClick={goToProductList}
          />
        </div>
      </div>
    </div>
  );
}
