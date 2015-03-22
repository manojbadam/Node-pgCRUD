# Node-pgCRUD
CRUD operations on PostgreSQL using pg node module and nodeJS REST API.

Started to tweak the pg node module (https://www.npmjs.com/package/pg) for PostgreSQL. 
Created a simple node API handles only GET requests, later added Express JS (https://www.npmjs.com/package/express) to handle routes.
For processing the POST request parameters, added the body-parser(https://www.npmjs.com/package/body-parser) module
When im trying to access the NODE API from Angular web page in other domain, faced few issues with CORS - Cross Origin Resource Sharing. 
Tried to use the Cors (https://www.npmjs.com/package/cors) but found another light weight middleware (http://enable-cors.org/server_expressjs.html).
Added Bootstrap for styling. 
AngularJS for display

Points to Remember/Lessons Learnt:
1. Always add the callback function at the end to Pg client Query. 
2. Express JS is optional and required only if you want to expose more methods/functions from API. 
3. Native Node JS application cannot handle the parsing of POST request parameters
4. Bower is another package manager same as npm, used in Index.js for installing angular-xeditable component
5. Browser makes an "Options" request to Server before POST call to determine the CORS request.
6. Tried to use the http delete from AngularJS to Node API but it didnt work, so changed it to Post with another route name
7. PostgreSQL connection string format pg://postgres:12345@localhost:5432/TestDB
pg://<login>:<password>:@<dblocation>:<port>/<DBName>
8. we should not write to response object before writing the header (status, access levels etc..) in Node JS.
9. angular-xeditable is a good component, only drawback is couldnt track which rows are modified and make those modifications in database. Need to tweak this component.



 
