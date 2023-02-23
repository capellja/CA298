let people = '{ "person":[' +
'{"name":"John","age":"8","address":"123 bothar bui"},' +
'{"name":"Jared","age":"20","address":"yellow brick lane"},' +
'{"name":"Jenny","age":"100","address":"downton abbey"} ]}';

const obj = JSON.parse(people);

for (let i = 0; i < obj.person.length; i++) {
    console.log(obj.person[i].name);
}