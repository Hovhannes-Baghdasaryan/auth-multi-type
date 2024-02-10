Multi Auth API

# This API was developed by me which has various authentication methods

1. By Mail, The User adds Mail and verified with the OTP sent to mail.
2. The same with SMS Phone (but, for now only my own phone number is available as Twilio free trial only can send to verified account owner phone number. For your testing you can create account change environment variables and test with you phone).
3. By Nickname which doesn't require any code verification.

All These mentioned types of authentication switches by environment variable

API DOCS

# Auth Login Entry Point: http://localhost:3001/api/auth/login
# username's type depends on env AUTH_TYPE the username is phone or mail or just nickname string.
Body {
    "username": "37444738987" // without +
}

# Auth Login: http://localhost:3001/api/auth/login-verify
# For nickname sign-in otp is omitted
# Both firstName and lastName are optional.
Body {
    "username": "37444738987", // without (+) 
    "first_ame": "First", // optional
    "last_name": "last", // optional
    "otp": "318653" // optional only when env.AUTH_TYPE=nickname
}

# Auth Login: http://localhost:3001/api/user/:id

I am sharing postman workspace as well
link: https://restless-astronaut-281607.postman.co/workspace/Team-Workspace~842e88a8-3edf-439c-8f9e-3e501529fe31/collection/21085921-3512ff98-678d-4c70-8962-38e7a646d0a9?action=share&creator=21085921