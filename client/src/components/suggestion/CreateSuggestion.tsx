import {
  CreateSuggestionLayOut,
  SuggestUser,
} from '../../assets/styles/CreateSuggestStyle';
// import { categoryData } from '../category/categoryData';
// import axios from 'axios';
import SuggestionFrom from '../suggestion/CreateSuggestForm';
import { useUserStore } from '../../store/user';

const CreateSuggestion: React.FC = () => {
  const userDetail = useUserStore().userDetail;
  return (
    <CreateSuggestionLayOut>
      <SuggestUser>{userDetail.name}님의 제안 강좌</SuggestUser>
      <SuggestionFrom />
    </CreateSuggestionLayOut>
  );
};

export default CreateSuggestion;
