const users = [
  {
    id: 0,
    name: "Hank",
    email: "hank@mail.ru",
    phone: "+375334985727",
    age: 23,
  },
  {
    id: 1,
    name: "Abagnale",
    email: "abagnale@mail.ru",
    phone: "+375345685727",
    age: 22,
  },
  {
    id: 3,
    name: "Frank",
    email: "frank@mail.ru",
    phone: "+37533467543",
    age: 33,
  },
  {
    id: 4,
    name: "Abbey",
    email: "abbey@mail.ru",
    phone: "+37536789607",
    age: 33,
  },
  {
    id: 5,
    name: "Edward",
    email: "edward@mail.ru",
    phone: "+37533235727",
    age: 21,
  },
  { id: 6, name: "Abel", email: "abel@mail.ru", phone: "+3753349567", age: 22 },
  {
    id: 7,
    name: "Reuben",
    email: "reuben@mail.ru",
    phone: "+375334567827",
    age: 28,
  },
  {
    id: 8,
    name: "Abelson",
    email: "abelson@mail.ru",
    phone: "+375345675727",
    age: 24,
  },
];

const data = {
  "/users": users,
};

function delay(val) {
  return new Promise((res, rej) => setTimeout(val ? res : rej, 500, val));
}

export function mockFetch(url) {
  const payload = data[url];
  return delay(payload);
}
