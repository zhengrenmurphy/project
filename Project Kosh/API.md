## Clients.js

* Get all users: 
  * `GET /api/clients/users` 
  * `throws {503} - if can't fetch users`
* Get a single user:
  * `GET/api/clients/:username?`
  * `throws {503} - if can't fetch users`
* Sign out:
  * `POST/api/clients/signout`
  * `throws {400} - if already signed out`
* Create new user:
  * `POST /api/clients`
  * `return {username} - the created username`
  * `throws {400} - if username/password empty`
  * `throws {403} - if name or email is already taken`
  * `throws {401} - if not signed in`
* Sign in
  * `POST/api/clients/signin/:username?`
  * `param {username} - username to sign in`
  * `return {username} - current username`
  * `throws {400} - if username/password empty`
  * `throws  {401} - if password is incorrect or if already signed in`
  * `throws {404} - if username does not exist`
* Update firstname
  * `PUT/api/clients/firstname/:firstname`
  * `param {firstname} - new firstname`
  * `return {firstname} - new firstname`
  * `throws {400} - if username empty`
  * `throws {401} - if not signed in`
* Update lastname
  * `PUT/api/clients/lastname/:lastname`
  * `param {lastname} - new lastname`
  * `throws {400} - if username empty`
  * `throws {401} - if not signed in`
* Update username
  * `PUT/api/clients/username/:username`
  * `param {username} - new username`
  * `return {username} - new username`
  * `throws {400} - if username empty`
  * `throws {401} - if not signed in`
  * `throws {403} - if username already exists`
* Update password
  * `PUT/api/clients/password/`
  * `throws {400} - if password empty`
  * `throws {401} - if not signed in`
* Update email
  * `PUT/api/clients/email/`
  * `throws {400} - if email empty`
  * `throws {401} - if not signed in`
  * `throws {403} - if email already exists'
* Delete a user
  * `DELETE /api/clients/`
  * `return {User} - the deleted user`
  * `throws {401} - if not signed in`
  
## clientRes.js

* Get all ClientReservations for User
  * `GET /api/clientRes`
  * `throws {404} - if no reservations exist`
* Get all ClientReservations for Business
  * `GET /api/clientRes/business`
  * `throws {404} - if no reservations exist`
* Create new ClientReservation
  * `POST /api/clientRes/add`
  * `return {ClientReservation} - the created client reservation`
  * `throws {403} - if reservation is already made for that user`
  * `throws {401} - if not signed in`
* Delete a ClientReservation.
  * `DELETE /api/clientRes/delete`

## businessRes.js

* Create new BusinessReservation table
  * `POST /api/businessRes/add`
  * `return {BusinessReservation} - the created client reservation`
* Get BusinessReservation table for business
  * `GET /api/businessRes`
  * `throws {404} - if no reservation table exists`
* Get BusinessReservation table for client
  * `GET /api/businessRes/client`
  * `throws {404} - if no reservation table exists`
* Update BusinessReservation table
  * `PUT /api/businessRes/edit`
  * `param {username} - new username`
  * `return {username} - new username`
  * `throws {401} - if not signed in`


## business.js

* Sign out
  * `POST/api/clients/signout`
  * `throws {400} - if not signed in`
* Get all of the business information
  * `GET/api/business`
  * `return {businessInformation} - all of the business information`
  * `throws {400} could not find the records`
* Get business name from username
  * `GET/api/business/name/:username`
  * `@throws {400} could not find the records`
* Get business information which has takeout service
  * `GET/api/business/takeout`
  * `{400} could not find the records`
* Get business location
  * `GET/api/business/delivery`
  * `@throws {400} could not find the records`
* Get business information which has outdoor service
  * `GET/api/business/outdoor`
  * `@throws {400} could not find the records`
* Get the business information for the current user who is logged in
  * `GET/api/business/single`
  * `return {businessInformation} - the single record of business information`
  * `throws {400} could not find the records`
* Get business names that match search pattern
  * `GET/api/business/search/:pattern?`
  * `@throws {400} could not find the records`
* check if the business information exist or not
  * `GET/api/business/exist`
  * `return {busiRecordExist} - the boolean type of `
  * `throws {400} operation fails`
* create new business information
  * `POST/api/business/`
  * `return {businessInformation} - the single record of business information`
  * `throws {400} operation fails`
* update the user information
  * `PUT/api/business/user`
  * `return {businessRecord} - the boolean type of uodating success or not `
  * `throws {400} operation fails`
* update new business information
  * `PUT/api/business/`
  * `return {newBusiInfo} - the single record of business information`
  * `throws {400} could not update the records`
* uploads business proof of ownership file
  * `POST/api/business/file/:busines`
  * `throws {400} could not upload`
* claim a business
  * `PUT/api/business/claim`
  * `throws {400} could not update`
* Get if business is claimed
  * `GET/api/business/claim/:business`
  * `throws {400} could not update`
 
