
import mockdata from './usersMock.json';

var request = require('request');
 function updateClient(postData){
            var clientServerOptions = {
                uri: '/api/users',
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
