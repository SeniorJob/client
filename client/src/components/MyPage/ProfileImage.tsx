import styled from 'styled-components';
import defaultImage from '../../assets/images/imageDefault.png';
import { Link } from 'react-router-dom';

const ProfileImage = () => {
  return (
    <Link to="/mypage/editprofile">
      <Image src={defaultImage} />
    </Link>
  );
};

const Image = styled.img`
  border: 1px solid lightgray;
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;

export default ProfileImage;
