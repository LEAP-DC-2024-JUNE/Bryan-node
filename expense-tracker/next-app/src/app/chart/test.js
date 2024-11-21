const data = [
  { date: "2024-11-14", amount: 10.0 },
  { date: "2023-3-14", amount: 10.0 },
  { date: "2024-11-14", amount: 10.0 },
  { date: "2024-4-14", amount: 10.0 },
  { date: "2023-3-14", amount: 10.0 },
  { date: "2022-5-14", amount: 10.0 },
  { date: "2021-11-14", amount: 10.0 },
  { date: "2022-9-14", amount: 10.0 },
  { date: "2024-11-14", amount: 10.0 },
  { date: "2023-3-14", amount: 10.0 },
  { date: "2023-11-14", amount: 10.0 },
  { date: "2024-9-14", amount: 10.0 },
  { date: "2022-11-14", amount: 10.0 },
  { date: "2024-3-14", amount: 10.0 },
  { date: "2022-11-14", amount: 10.0 },
  { date: "2024-11-14", amount: 10.0 },
  { date: "2021-4-14", amount: 10.0 },
  { date: "2021-11-14", amount: 10.0 },
  { date: "2024-11-14", amount: 10.0 },
  { date: "2022-4-14", amount: 10.0 },
  { date: "2024-4-14", amount: 10.0 },
  { date: "2022-11-14", amount: 10.0 },
  { date: "2024-11-14", amount: 10.0 },
  { date: "2023-11-14", amount: 10.0 },
  { date: "2024-5-14", amount: 10.0 },
  { date: "2023-9-14", amount: 10.0 },
  { date: "2023-11-14", amount: 10.0 },
];

const grouped = data.reduce((groups, item) => {
  const year = item.date.split("-")[0];
  if (!groups[year]) {
    groups[year] = [];
  }
  groups[year].push(item);
  return groups;
}, {});

const years = Object.keys(grouped);
for (let i = 0; i < years.length; i++) {
  const year = years[i];
  grouped[year] = grouped[year].reduce((months, item) => {
    const month = item.date.split("-")[1];
    if (!months[month]) {
      months[month] = [];
    }
    months[month].push(item);
    return months;
  }, {});
}

console.log(grouped["2024"]);
