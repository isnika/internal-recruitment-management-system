# JWT Flow In Project

File nay mo ta luong JWT dang duoc backend su dung trong project nay.

## 1. Cac file chinh lien quan

- `backend/src/main/java/backend/controller/UserController.java`
- `backend/src/main/java/backend/service/Impl/UserServiceImpl.java`
- `backend/src/main/java/backend/config/SecurityConfig.java`
- `backend/src/main/java/backend/security/JwtAuthenticationFilter.java`
- `backend/src/main/java/backend/security/JwtUtil.java`
- `backend/src/main/java/backend/security/CustomUserDetailsService.java`
- `backend/src/main/java/backend/security/AuthUser.java`

## 2. Tong quan flow

Luong hoat dong JWT trong project:

1. User goi API `register` hoac `login`.
2. Backend xac thuc email/password.
3. Neu hop le, backend tao JWT.
4. JWT duoc tra ve cho frontend qua `AuthResponse`.
5. Frontend gui JWT trong header:

```http
Authorization: Bearer <token>
```

6. Moi request di vao backend se qua `JwtAuthenticationFilter`.
7. Filter doc token, kiem tra token co hop le khong.
8. Neu hop le, backend dat thong tin user vao `SecurityContextHolder`.
9. Sau do Spring Security moi cho phep truy cap API theo role.

## 3. Flow register

API:

```http
POST /api/auth/register
```

Controller nhan request o:

- `UserController.register()`

Service xu ly o:

- `UserServiceImpl.register()`

Ben trong `register()`:

1. Kiem tra request hop le.
2. Kiem tra email da ton tai chua.
3. Ma hoa password bang `PasswordEncoder` (`BCryptPasswordEncoder`).
4. Gan role cho user.
5. Luu user vao database.
6. Tao JWT bang:

```java
jwtUtil.generateToken(AuthUser.fromUser(savedUser))
```

7. Tra token ve cho client trong `AuthResponse`.

## 4. Flow login

API:

```http
POST /api/auth/login
```

Controller:

- `UserController.login()`

Service:

- `UserServiceImpl.login()`

Trong `login()`:

1. Kiem tra email/password co rong khong.
2. Goi `authenticationManager.authenticate(...)`.
3. `AuthenticationManager` dung `DaoAuthenticationProvider`.
4. `DaoAuthenticationProvider` goi `CustomUserDetailsService.loadUserByUsername(email)`.
5. Service nay lay user tu database bang email.
6. Spring so sanh password request voi password da hash trong DB.
7. Neu dung, backend tao JWT bang:

```java
String token = jwtUtil.generateToken(authUser);
```

8. Tra ve:

```json
{
  "token": "...",
  "type": "Bearer",
  "userId": 1,
  "email": "user@gmail.com",
  "role": "CANDIDATE"
}
```

## 5. JWT duoc tao nhu the nao

Code nam trong:

- `backend/src/main/java/backend/security/JwtUtil.java`

Khi tao token, project dang dua vao token cac thong tin:

- `subject`: email cua user
- `userId`: id cua user
- `role`: authorities cua user
- `issuedAt`: thoi diem tao token
- `expiration`: thoi diem het han

Doan code chinh:

```java
return Jwts.builder()
    .claims(extraClaims)
    .subject(userDetails.getUsername())
    .issuedAt(now)
    .expiration(expiration)
    .signWith(getSigningKey())
    .compact();
```

Gia tri cau hinh doc tu `application.properties`:

```properties
jwt.secret=ThisIsASecretKeyForJwtAuthenticationMustBeAtLeast32BytesLong
jwt.expiration=86400000
```

Y nghia:

- `jwt.secret`: key de ky token
- `jwt.expiration=86400000`: token het han sau 86400000 ms = 24 gio

## 6. Moi request duoc xac thuc ra sao

Code nam trong:

- `backend/src/main/java/backend/security/JwtAuthenticationFilter.java`

Filter nay chay truoc `UsernamePasswordAuthenticationFilter`.

Qua trinh:

1. Doc header `Authorization`.
2. Neu khong co header hoac khong bat dau bang `Bearer ` thi bo qua.
3. Cat token ra khoi header.
4. Dung `jwtUtil.extractUsername(jwt)` de lay email trong token.
5. Neu email hop le va `SecurityContext` chua co authentication:
6. Goi `customUserDetailsService.loadUserByUsername(username)`.
7. Kiem tra token con hop le bang:

```java
jwtUtil.isTokenValid(jwt, userDetails)
```

8. Neu hop le, tao:

```java
UsernamePasswordAuthenticationToken
```

9. Dat object nay vao:

```java
SecurityContextHolder.getContext().setAuthentication(authenticationToken);
```

Luc nay Spring hieu rang request hien tai da dang nhap.

## 7. Sau khi token hop le, role duoc xu ly the nao

Role duoc dua vao `AuthUser`.

Code nam trong:

- `backend/src/main/java/backend/security/AuthUser.java`

Khi convert tu `User` sang `AuthUser`, project tao authority theo format:

```java
ROLE_<TEN_ROLE>
```

Vi du:

- `CANDIDATE` -> `ROLE_CANDIDATE`
- `ADMIN` -> `ROLE_ADMIN`
- `RECRUITER` -> `ROLE_RECRUITER`

Do do khi dung:

```java
@PreAuthorize("hasRole('CANDIDATE')")
```

Spring se kiem tra authority `ROLE_CANDIDATE`.

## 8. SecurityConfig dang bao ve route nhu the nao

Code nam trong:

- `backend/src/main/java/backend/config/SecurityConfig.java`

Project dang cau hinh:

- Tat CSRF
- Bat CORS
- Dung JWT thay vi session
- Session la `STATELESS`
- Chi cho phep public:
  - `/api/auth/**`
  - `/uploads/**`
  - `/error`
- Cac route con lai bat buoc phai authenticated

Y nghia:

- Chua login thi khong vao duoc API duoc bao ve
- Co token roi nhung sai role thi van bi chan

## 9. Vi du request thuc te

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

Body:

```json
{
  "email": "candidate@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9....",
  "type": "Bearer",
  "userId": 5,
  "email": "candidate@gmail.com",
  "role": "CANDIDATE"
}
```

### Goi API can dang nhap

```http
GET /api/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9....
```

### Goi API can dung role

```http
POST /api/cvs/upload
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9....
Content-Type: multipart/form-data
```

Neu token thuoc user co role `CANDIDATE`, request moi duoc phep di tiep.

## 10. Neu token loi thi sao

Trong `JwtAuthenticationFilter`, neu parse token loi, het han, hoac token sai chu ky:

1. Filter se `clearContext()`
2. Goi `customAuthenticationEntryPoint`
3. Backend tra response unauthorized

Noi ngan gon:

- token sai -> 401
- token het han -> 401
- khong co token ma route can login -> 401
- co token nhung khong dung role -> 403

## 11. Cach nho nhanh flow nay

Ban co the nho theo cau:

`Login/Register -> tao JWT -> frontend luu token -> gui Bearer token moi request -> filter doc token -> set SecurityContext -> Spring check role -> cho vao controller`

## 12. Ghi chu thuc te cho project nay

- JWT nay la stateless, backend khong luu session.
- Moi request can gui lai token.
- Neu doi secret hoac token het han, user phai login lai.
- `getCurrentUser()` trong service dang lay user tu `SecurityContextHolder`.
- Cac service khac nhu upload CV cung dang lay user hien tai theo cach nay.
