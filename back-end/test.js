

const date = new Date();
date.setMinutes(new Date().getMinutes() + 10);

const oldDate = new Date();

console.log(date > oldDate);

console.log(date < oldDate);