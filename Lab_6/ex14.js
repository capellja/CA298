let text = '{ "person":[' +
'{"name":"John","age":"8","address":"123 bothar bui"}]}';

const obj = JSON.parse(text);
console.log(obj.person[0].name);
console.log(obj.person[0].age);
console.log(obj.person[0].address);