# /users/register Endpoint Documentation

## Description
The `/users/register` endpoint is used to register a new user. It validates the input data and creates a new user record.

## Request Data Format
- **email**: A valid email string.
- **fullname**: An object containing:
  - **firstname** (required): Minimum 3 characters.
  - **lastname** (optional): Minimum 3 characters if provided.
- **password**: A string with at least 6 characters.

### Example Request Body
```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}
```

## Expected Responses
- **201 Created**: When the user is successfully registered. Returns an authentication token and user details.
- **422 Unprocessable Entity**: When there are validation errors in the request data.

## /users/login Endpoint Documentation

### Description
The `/users/login` endpoint allows an existing user to log in with their credentials.

### Request Data Format
- **email**: A valid email string.
- **password**: A string with at least 6 characters.

### Example Request Body
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Expected Responses
- **200 OK**: On successful login, returns an authentication token and user details.
- **422 Unprocessable Entity**: When validation fails or credentials are incorrect.

## /users/profile Endpoint Documentation

### Description
The `/users/profile` endpoint returns the authenticated user's profile data.

### Authentication
- Requires a valid token in the request header or cookie.

### Example Request
GET /users/profile

### Expected Response
- **200 OK**: Returns user profile details.

## /users/logout Endpoint Documentation

### Description
The `/users/logout` endpoint logs out the user by clearing the token cookie and blacklisting the current token.

### Authentication
- Requires a valid token in the request header or cookie.

### Example Request
GET /users/logout

### Expected Response
- **200 OK**: Returns a message indicating successful logout.

## Captain Routes Documentation

### POST /captain/register Endpoint

#### Description
Registers a new captain account. In addition to typical user information, the request must include vehicle details.

#### Request Data Format
- **email**: A valid email string.
- **fullname**: An object containing:
  - **firstname** (required): Minimum 3 characters.
  - **lastname** (optional).
- **password**: A string with at least 6 characters.
- **vehicle**: An object containing:
  - **color**: Minimum 3 characters.
  - **plate**: Minimum 3 characters.
  - **capacity**: A numeric value.
  - **vehicleType**: Must be one of 'car', 'motorcycle', or 'auto'.

##### Example Request Body
```json
{
  "email": "captain@example.com",
  "fullname": {
    "firstname": "Captain",
    "lastname": "Smith"
  },
  "password": "securePass123",
  "vehicle": {
    "color": "red",
    "plate": "XYZ987",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Expected Responses
- **201 Created**: When the captain is registered successfully. Returns captain details.
- **422 Unprocessable Entity**: When validation fails.
