

var mockdata = require('./usersMock.json');
console.log(mockdata)
var request = require('request');


 function updateClient(postData){
            console.log(postData)
            var clientServerOptions = {
                uri: 'http://localhost:3001/api/users',
                body: JSON.stringify(postData),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(clientServerOptions, function (error, response) {
                console.log(error,response.body);
                return;
            });
        }

mockdata.forEach(element => {
    updateClient(element)
});
