import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

export const selectLat = atom({
  key: 'selecLat',
  default: null,
  effects_UNSTABLE: [persistAtom],
}); 

export const selectLong = atom({
  key: 'selecLong',
  default: null,
  effects_UNSTABLE: [persistAtom],
}); 

export const selectCate = atom({
  key: 'selecCate',
  default: '',
  effects_UNSTABLE: [persistAtom],
}); 