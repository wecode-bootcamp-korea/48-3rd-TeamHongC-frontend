# <img src="https://github.com/wecode-bootcamp-korea/48-3rd-TeamHongC-frontend/blob/develop/public/images/nav_logo.png?raw=true" style="width: 45px; height: 45px;"/>Project HongC | 홍시나무
위치 기반 마켓 플레이스 홍시나무
<div align="center">
<img src= "https://github.com/wecode-bootcamp-korea/48-3rd-TeamHongC-frontend/blob/develop/public/images/main-logo.png?raw=true" style="width: 415px; height: 400px;">
</div>

## ▶️시연 영상
[![홍시나무 시연 영상 썸네일](https://github.com/serenity1091/images/blob/main/48-3rd-TeamHongC-frontend/%ED%99%8D%EC%8B%9C%EB%82%98%EB%AC%B4%20%EC%8B%9C%EC%97%B0%20%EC%98%81%EC%83%81%20%EC%8D%B8%EB%84%A4%EC%9D%BC.png?raw=true)](https://www.youtube.com/watch?v=N2UFzhke_48)

# 💻프로젝트 소개
## ⏰개발 기간
2023/09/04 ~ 2023/09/22

## 🧑‍🤝‍🧑멤버 구성
FE - 김슬기, 김진희, [전형민](https://github.com/InnimE?tab=repositories)

## 📂사용한 라이브러리
- 리액트 아이콘 라이브러리 `$ npm install react-icons --save`
- 카카오 리액트 `npm install react-kakao-maps-sdk`

## 🧑‍💻서비스 소개

<div align="center"><h3>🔧기술 스택</h3></div>
<div align="center">FRONTEND</div>
<div align="center">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
<img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">
</div>
</br>
<div align="center">BACKEND</div>
<div align="center">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  
</div>
</br>
<div align="center">CO-OP TOOLS</div>
<div align="center">  
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white">
  <img src="https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=Trello&logoColor=white">
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
  <a href="https://www.figma.com/file/Phdi4zHwhyDcAekaz7AJuN/Untitled?type=design&node-id=0%3A1&mode=design&t=zs6cMceeNlEBAYrg-1"><img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/></a>
</div>
</br>

## 📌구현 기능
### 로그인/회원가입
- 로그인

  카카오 API를 사용해 구현 / 기대효과 / 고민과 해결방안 / 이미지 등
  
### 상품리스트(메인)
<img width="505" alt="2-1 상품리스트" src="https://github.com/wecode-bootcamp-korea/48-3rd-TeamHongC-frontend/assets/133567708/9420d2d7-f8c4-4721-a499-c458bb7206ea">

- GPS 또는 네트워크를 이용해 현재 위치 정보를 반환하는 HTML5 GeoLocation API 사용하여 유저의 현 위치를 확인
- GeoLocation으로 만든 Hook을 이용해 반복적으로 3초마다 현 위치를 확인하여 좌표값 재설정
- 반경 1km 내 판매중인 상품리스트를 출력
- 역 지오코딩을 사용하여 좌표값을 주소로 변환, 유저의 현 위치가 맞는지 스스로 확인할 수 있도록 변환한 주소를 상단에 배치
- 신상품 / 중고로 상품의 컨디션과 상품 종류 카테고리를 선택할 수 있도록 하여 소비자가 원하는 상품을 쉽게 찾을 수 있도록 구현
- 찜하기 기능으로 리스트 페이지에서 상품이 보이지 않더라도 찜한 상품을 보여주는 별도의 페이지에서 확인할 수 있도록 구현
  
### 결제
 - 카카오 API를 사용
 - 백앤드와의 통신으로 상품 상태, 가격 등을 get과 post로 전달 가능
 - 결제중, 결제실패, 결제취소, 결제완료로 각각 연결될 수 있게 구현

### 내 주변 상품보기
<img width="491" alt="2-4 내주변 상품 보기" src="https://github.com/wecode-bootcamp-korea/48-3rd-TeamHongC-frontend/assets/133567708/26eff33f-16e0-41aa-9f4e-dd95bdfe56ed">

- 현재 유저의 위치와 판매중인 상품을 시각적으로 보여주기 위해 카카오맵 API를 사용하여 지도 위 마커를 띄우는 UI를 구현
- GeoLocation API를 사용하여 현 위치를 자동으로 불러오고, 쿼리스트링으로 좌표값을 서버로 전달
- 좌표값 기준 반경 1km 내 판매중인 상품을 지도 위 마커로 표시
- 마커 표시된 상품은 메인에서 보이는 상품리스트와 동일
- 마커 위 hover시 판매상품의 간단한 정보를 볼 수 있고, 클릭 시 상세피이지로 이동
- 모바일 유저의 사용을 고려하여 마커 위 hover가 아닌 클릭 시 정보를 볼 수 있도록 수정이 필요해 보임

### 상품 등록 전 - 지도 위 내 위치 설정
<img width="466" alt="4-1 상품등록 (위치지정)" src="https://github.com/wecode-bootcamp-korea/48-3rd-TeamHongC-frontend/assets/133567708/2c2645ba-b311-4c64-b6de-6ed47b807bd1">

- 카카오맵 API를 사용하여 구매자와 거래할 위치를 설정할 수 있도록 구현
- GeoLocation으로 현 위치를 우선 지정, 유저가 직접 거래/판매할 위치를 클릭하여 마커를 옮길 수 있도록 함
- 마커가 원하는 위치에 정확히 찍혔는지 확인할 수 있도록 역 지오코딩을 사용하여 좌표값을 주소로 변환, 마커 위에 출력
- 위치 지정 완료 버튼을 누르면 지정한 위치 좌표값을 쿼리스트링으로 상품 등록 페이지에 전달

### 검색기능
<img width="495" alt="2-5 상품 검색 기능" src="https://github.com/wecode-bootcamp-korea/48-3rd-TeamHongC-frontend/assets/133567708/f899921a-2a87-4289-8a67-34a5ac7fd3f1">

- 상단의 돋보기 아이콘을 눌러 검색창 모달을 띄움
- 빈 칸 상태로 검색을 진행 시, 1글자 이상 입력을 요구하는 경고메시지 출력
- 정상적으로 검색 진행 시, 검색 키워드를 리스트 상단에 띄워 유저가 확인할 수 있고, 키워드에 해당되는 상품을 리스트로 출력
