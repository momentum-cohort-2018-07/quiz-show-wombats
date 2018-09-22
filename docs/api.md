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

## GET /quizzes

Response:

```
200 OK
{
  "data": {
    "totalItems": 10,
    "items": [
      {"id": 1, "title": "JS Arrays", "isPublished": true, "questionCount": 4},
      ...
    ]
  }
}
```

### Notes

* unpublished quizzes will only be shown to admins
* come back and add `prevScore` when we start collecting those
* add paging later

## GET /quizzes/1

Response:

```
200 OK
{
  "data": {
    "id": 1,
    "title": "JS Arrays",
    "is_published": true,
    "questions": [
      {
        "id": 1,
        "text": "What function is used to return a subset of an array?",
        "answers": [
          { "id": 1, "text": "map" },
          { "id": 2, "text": "filter" },
          { "id": 3, "text": "reduce" }
        ]
      }
    ]
  }
}
```
