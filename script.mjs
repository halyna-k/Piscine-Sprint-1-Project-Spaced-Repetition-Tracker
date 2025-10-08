import { getUserIds } from "./common.mjs";

window.onload = function () {
  const users = getUserIds();
  console.log(`There are ${users.length} users`);
};
