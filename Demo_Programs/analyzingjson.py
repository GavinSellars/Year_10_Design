import json

jString = '{"name":"Felix", "age":20, "city": "Toronto"}'

data = json.loads(jString)

print(data["city"]) 


jString = '{"name":{"firstName":"Cleopatra", "lastName": "Ptolemy"}, "address":{"city":"Alexandria". "province":"Egypt"}"}'

data = json.loads(jString)

print(data["city"])