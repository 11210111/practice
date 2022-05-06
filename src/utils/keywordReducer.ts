

export type KeywordState = {
  id: number;
  keyword: string;
};

type KeywordAction = {
  type: string;
  data?: KeywordState[];
  payload?: KeywordState;
  targetId?: number;
};

export const initialKeywordState: KeywordState[] = [];

const reducer = (
  state: KeywordState[],
  action: KeywordAction
): KeywordState[] => {
  let newKeywordState: KeywordState[] = [];
  switch (action.type) {
    case 'INIT': {
      return action.data!;
    }
    case 'ADD': {
      const preKeyword = state.find(
        (data) => data.keyword === action.payload?.keyword
      );
      if (preKeyword) {
        state = state.filter(
          (data) => data.keyword !== action.payload?.keyword
        );
      }
      newKeywordState = [action.payload!, ...state];
      break;
    }
    case 'REMOVE': {
      newKeywordState = state.filter(
        (keywordData) => keywordData.id !== action.targetId
      );
      break;
    }
    case 'RESET': {
      newKeywordState = [];
      break;
    }
    default:
      return state;
  }

  localStorage.setItem('keywords', JSON.stringify(newKeywordState));
  return newKeywordState;
};

export default reducer;
