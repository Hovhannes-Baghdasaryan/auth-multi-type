# Multi Auth API

## This API provides authentication phone number, email and custom nickname.

## 1. The User will receive OTP code by mail.
## 2. The same By SMS Phone.
#### 2.1 For now only my own phone number is available as Twilio free trial only can send to verified account owner phone number.
#### 2.2 For your testing you can create account change environment variables and test with you phone.
## 3. By Nickname User will add custom nickname without any verification.

### All These mentioned types of authentication are managed with environment variable

# API DOCS

# Auth Login Entry Point: 
### http://localhost:3001/api/auth/login
### username's type depends on env AUTH_TYPE. 
#### AUTH_TYPE=nickname (custom nickname).
#### AUTH_TYPE=phone (phone number).
#### AUTH_TYPE=mail (e-mail).
```
Body {
    "username": "37444738987" // without +
}
```

# Auth Login: 
### http://localhost:3001/api/auth/login-verify
### For nickname otp is optional as well
#### For only nickname AUTH_TYPE both first_name, last_name and OTP are optional.
```
Body {
    "username": "37444738987", // without (+) 
    "first_name": "First", // optional
    "last_name": "last", // optional
    "otp": "318653" // optional only when env.AUTH_TYPE=nickname
}
```

# Get User: 
### http://localhost:3001/api/users/:id

```
{
    "message": "Get Single User Successfully",
    "data": {
           "id": userId,
           "username": username,
           "firstName": firstName | null,
           "lastName": lastName | null,
    }
}
```

# Get All User Paginated:
#### http://localhost:3001/api/users?page=1&per_page=10
#### page and per_page are optional. 
#### Default values are page=1, per_page=10

```
{
    "message": "Get All Users Successfully",
    "data": {
        "total": totalRecords,
        "items": [
            {
                "id": userId,
                "username": username,
                "firstName": firstName | null,
                "lastName": lastName | null,
            },
            ...
        ]
    }
}
```

### I am sharing postman workspace as well
#### [Postman Workspace](https://restless-astronaut-281607.postman.co/workspace/Team-Workspace~842e88a8-3edf-439c-8f9e-3e501529fe31/collection/21085921-3512ff98-678d-4c70-8962-38e7a646d0a9?action=share&creator=21085921)