## Using the API

### Register a new user:

POST /api/register with parameters: first_name, last_name, date_of_birth, gender, email, password, and password_confirmation.

### Login an existing user:

POST /api/login with parameters: email, password.

### Logout the user:

POST /api/logout (requires the user to be logged in with a valid token).
