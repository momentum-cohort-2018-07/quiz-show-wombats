# Registration and login

## POST /register

Request:

```
{ email: 'clinton@example.org', password: 'password1' }
```

Response:

```
201 Created
{
  "data":  {  
    "email": 'clinton@example.org',
    "token": 'abc123',
    "admin": false
  }
}
```

Request:

```
{ email: 'clinton@example.org', password: 'password1' }
```

Response:

```
422 Unprocessable Entity
{  
  "errors": ["Email has already been taken"]
}
```

Request:

```
{ email: 'clinton@example.org' }
```

Response:

```
422 Unprocessable Entity
{  
  "errors": ["Password can't be blank"]
}
```

## POST /login

Request:

```
{ email: 'clinton@example.org', password: 'password1' }
```

Response:

```
200 OK
{
  "data":  {  
    "email": 'clinton@example.org',
    "token": 'abc123',
    "admin": false
  }
}
```

Request:

```
{ email: 'clinton@example.org', password: 'bad-password' }
```

Response:

```
422 Unprocessable Entity
{
  "error":  {  
    "message": "login.no_user"
  }
}
```

Request:

```
{ email: 'not-a-user@example.org', password: 'password1' }
```

Response:

```
422 Unprocessable Entity
{
  "error":  {  
    "message": "login.no_user"
  }
}
```
