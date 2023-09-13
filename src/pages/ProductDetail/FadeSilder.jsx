import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FadeSilder.scss';

function FadeSilder({ images }) {
  return (
    <Carousel fade className="fadeSilder">
      {images.map((img, index) => (
        <Carousel.Item key={index}>
          <img src={img.imageUrl} alt="이미지 불러오기 실패" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default FadeSilder;
