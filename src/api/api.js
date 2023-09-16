import axios from "axios";

//api 호출 정보
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Auth - auth
export function auth(email, pw, nickname, age, gender, category) {
  return instance.post(`/auth/register?sns_type=email`, { email, pw, nickname, age, gender, category });
}

//Login - login
export function login(email, pw) {
  return instance.post(`/auth/login?sns_type=email`, { email, pw });
}

//MyPage - click_list
export function click_list(id) {
  return instance.get(`/click_list?user_id=${id}`);
}

//Check - personalModel
export function personalModel(id) {
  return instance.get(`/personalModel?user_id=${id}`);
}

//Check - firstModel
export function firstModel(category, id) {
  return instance.get(`/firstModel?user_category=${category}&user_id=${id}`);
}

//Chat - chatRRS
export function chatRRS(id, key) {
  return instance.post(`/chatRRS?user_id=${id}&query=${key}`);
}

//Detail - detail
export function detail(storeId, id) {
  return instance.post(`/detail/${storeId}?user_id=${id}`);
}

//Detail - similarRestaurant
export function similarRestaurant(storeId, id) {
  return instance.get(`/similarRestaurant?id=${storeId}&user_id=${id}`);
}

//Detail, CheckStore, ChatStore - userLike
export function userLike(id, userId) {
  return instance.post(`/userLike/${id}?user_id=${userId}`);
}

//Detail, CheckStore, ChatStore - userUnlike
export function userUnlike(id, userId) {
  return instance.post(`/userUnlike/${id}?user_id=${userId}`);
}

//Detail, MyPage, CheckStore, ChatStore, Plus - click_log
export function click_log(id, userId) {
  return instance.post(`/click_log/${id}?user_id=${userId}`);
}

//Plus - boysandgirls
export function boysandgirls(id) {
  return instance.get(`/boysandgirls?user_id=${id}`);
}
