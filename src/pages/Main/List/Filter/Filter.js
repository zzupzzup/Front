export function Filter(chatList, selectedArea, selectedTypes) {
  let filteredList = [...chatList];

  if (selectedArea) {
    filteredList = filteredList.filter((store) => store.address.includes(selectedArea));
  }

  if (selectedTypes.length > 0) {
    filteredList = filteredList.filter((store) => selectedTypes.includes(store.category));
  }

  return filteredList;
}
