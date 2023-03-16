import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

export const userId = atom({
  key: 'userId',
  default: 0,
  effects_UNSTABLE: [persistAtom],
}); 