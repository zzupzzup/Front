import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

export const selectStore = atom({
  key: 'selectStore',
  default: null,
  effects_UNSTABLE: [persistAtom],
}); 

export const selectList = atom({
  key: 'selectList',
  default: false,
  effects_UNSTABLE: [persistAtom],
}); 