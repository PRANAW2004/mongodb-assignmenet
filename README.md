TEAM Members:
Kenta Lange
Pranaw Otthi

Run the server using Nodemon server.js and then execute the below commands in the termianl

#CREATE
curl -X POST http://localhost:3000/add-user \
  -H "Content-Type: application/json" \
  -d '{"name":"Jack","age":23}'

#READ(ALL USERS)
curl -X GET http://localhost:3000/users

#READ(ONE USER)
curl -X GET http://localhost:3000/users/<object id of that user>

#UPDATE
curl -X PUT http://localhost:3000/users/<object id of that user> \
  -H "Content-Type: application/json" \
  -d '{"name":"Jack", "age":21}'

#DELETE
curl -X DELETE http://localhost:3000/users/<object id of that user>
