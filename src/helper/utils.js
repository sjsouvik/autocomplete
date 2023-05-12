export const loadUsers = async () => {
  const response = await fetch(
    "http://www.mocky.io/v2/5ba8efb23100007200c2750c"
  );
  return await response.json();
};

export const filterUserItems = (user, searchText) =>
  user.items.filter((item) => item.toLowerCase().includes(searchText));
