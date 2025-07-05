## Endpoints

### 1. Get My Dashboard

**GET** `/api/user/dashboard`

Get dashboard statistics for the authenticated user.

**Response:**
```json
{
  "message": "Dashboard data retrieved successfully.",
  "data": {
    "birds": 5,
    "races": 12,
    "wins": 3,
    "payments": 8,
    "raceResult": [
      {
        "bird": {
          "name": "Eagle",
          "id": "uuid",
          "bandNumber": "BAND123"
        },
        "arrivalTime": "2025-07-05T10:30:00Z",
        "position": 1,
        "speed": 85.5
      }
    ]
  }
}
```

---

### 2. Get My Lofts

**GET** `/api/user/lofts`

Get all lofts owned by the authenticated user.

**Response:**
```json
{
  "message": "Lofts retrieved successfully.",
  "data": [
    {
      "id": "uuid",
      "name": "Main Loft",
      "loftId": "LOFT-1"
    }
  ]
}
```

---

### 3. Get Loft by ID

**GET** `/api/user/lofts/:id`

Get detailed information about a specific loft (only accessible by owner or shared users).

**Parameters:**
- `id` (string, required): Loft UUID

**Response:**
```json
{
  "message": "Loft retrieved successfully.",
  "data": {
    "id": "uuid",
    "name": "Main Loft",
    "loftId": "LOFT-1",
    "location": "New York",
    "userId": "uuid",
    "_count": {
      "birds": 5
    },
    "birds": [
      {
        "id": "uuid",
        "name": "Eagle",
        "color": "Brown",
        "bandNumber": "BAND123",
        "breed": "Racing Homer",
        "status": "ACTIVE"
      }
    ]
  }
}
```

---

### 4. Get Shared Lofts

**GET** `/api/user/lofts/shared`

Get all lofts shared with the authenticated user.

**Response:**
```json
{
  "message": "Shared lofts retrieved successfully.",
  "data": [
    {
      "id": "uuid",
      "name": "Friend's Loft",
      "loftId": "LOFT-2",
      "location": "California",
      "userId": "other_user_uuid"
    }
  ]
}
```

---

### 5. Get My Races

**GET** `/api/user/races`

Get all race entries for the authenticated user.

**Query Parameters:**
- `status` (optional): Filter by race status (`UPCOMING`, `LIVE`, `COMPLETED`)

**Response:**
```json
{
  "message": "Races retrieved successfully.",
  "data": [
    {
      "id": "uuid",
      "raceId": "uuid",
      "birdId": "uuid",
      "userId": "uuid",
      "status": "PAID",
      "birdStatus": "ARRIVED",
      "arrivalTime": "2025-07-05T10:30:00Z",
      "position": 1,
      "speed": 85.5
    }
  ]
}
```

---

### 6. Get My Payments

**GET** `/api/user/payments`

Get all payments made by the authenticated user.

**Response:**
```json
{
  "message": "Payments retrieved successfully.",
  "data": [
    {
      "id": "uuid",
      "paypalTransactionId": "TXN123456",
      "payerEmail": "user@example.com",
      "amount": 25.00,
      "currency": "USD",
      "status": "SUCCESS",
      "paymentTime": "2025-07-05T09:00:00Z",
      "raceEntries": [
        {
          "race": {
            "id": "uuid",
            "name": "Summer Championship",
            "date": "2025-07-10T08:00:00Z",
            "distanceKm": 500.5,
            "startLocation": "City A",
            "endLocation": "City B"
          },
          "bird": {
            "id": "uuid",
            "name": "Eagle",
            "bandNumber": "BAND123"
          }
        }
      ]
    }
  ]
}
```

---

### 7. Create Loft

**POST** `/api/user/lofts`

Create a new loft for the authenticated user.

**Request Body:**
```json
{
  "name": "My New Loft",
  "location": "New York, NY"
}
```

**Response:**
```json
{
  "message": "Loft created successfully.",
  "data": {
    "id": "uuid",
    "name": "My New Loft",
    "location": "New York, NY",
    "loftId": "LOFT-3",
    "userId": "uuid",
    "createdAt": "2025-07-05T12:00:00Z"
  }
}
```

---

### 8. Update Loft

**PUT** `/api/user/lofts/:id`

Update an existing loft (only by owner).

**Parameters:**
- `id` (string, required): Loft UUID

**Request Body:**
```json
{
  "name": "Updated Loft Name",
  "location": "Updated Location"
}
```

**Response:**
```json
{
  "message": "Loft updated successfully.",
  "data": {
    "id": "uuid",
    "name": "Updated Loft Name",
    "location": "Updated Location",
    "loftId": "LOFT-3",
    "userId": "uuid",
    "createdAt": "2025-07-05T12:00:00Z"
  }
}
```

---

### 9. Create Bird

**POST** `/api/user/lofts/:id/birds`

Create a new bird in a specific loft (only by owner or shared users).

**Parameters:**
- `id` (string, required): Loft UUID

**Request Body (Form Data):**
- `name` (string, required): Bird name
- `bandNumber` (string, required): Unique band number
- `breed` (string, optional): Bird breed
- `color` (string, optional): Bird color
- `gender` (string, required): `MALE` or `FEMALE`
- `age` (number, optional): Bird age
- `wingspan` (number, optional): Wing span in cm
- `vaccinationStatus` (boolean, optional): Vaccination status
- `penNumber` (string, optional): Pen number
- `raceExperience` (number, optional): Race experience count
- `rfIdTag` (string, optional): RF ID tag
- `file` (file, required): Bird photo

**Response:**
```json
{
  "message": "Bird created successfully.",
  "data": {
    "id": "uuid",
    "name": "Eagle",
    "bandNumber": "BAND123",
    "breed": "Racing Homer",
    "color": "Brown",
    "gender": "MALE",
    "age": 2,
    "photoUrl": "https://cdn.example.com/birds/uuid.jpg",
    "wingspan": 45.5,
    "vaccinationStatus": true,
    "penNumber": "P1",
    "raceExperience": 5,
    "status": "ACTIVE",
    "rfIdTag": "RF123",
    "loftId": "uuid",
    "createdAt": "2025-07-05T12:00:00Z"
  }
}
```

---

### 10. Update Bird

**PUT** `/api/user/birds/:id`

Update an existing bird (only by loft owner).

**Parameters:**
- `id` (string, required): Bird UUID

**Request Body:**
```json
{
  "name": "Updated Eagle",
  "breed": "Updated Breed",
  "color": "Updated Color",
  "age": 3,
  "wingspan": 46.0,
  "vaccinationStatus": false,
  "penNumber": "P2",
  "raceExperience": 8,
  "status": "ACTIVE",
  "rfIdTag": "RF124"
}
```

**Response:**
```json
{
  "message": "Bird updated successfully.",
  "data": {
    "id": "uuid",
    "name": "Updated Eagle",
    "bandNumber": "BAND123",
    "breed": "Updated Breed",
    "color": "Updated Color",
    "gender": "MALE",
    "age": 3,
    "photoUrl": "https://cdn.example.com/birds/uuid.jpg",
    "wingspan": 46.0,
    "vaccinationStatus": false,
    "penNumber": "P2",
    "raceExperience": 8,
    "status": "ACTIVE",
    "rfIdTag": "RF124",
    "loftId": "uuid",
    "createdAt": "2025-07-05T12:00:00Z"
  }
}
```

---

### 11. Invite to Loft

**POST** `/api/user/lofts/:loftid/invite/:userId`

Invite a user to access a loft (only by loft owner).

**Parameters:**
- `loftid` (string, required): Loft UUID
- `userId` (string, required): User UUID to invite

**Response:**
```json
{
  "message": "Invitation sent successfully.",
  "data": {
    "id": "uuid",
    "loftId": "uuid",
    "invitedById": "uuid",
    "invitedUserId": "uuid",
    "status": "PENDING",
    "createdAt": "2025-07-05T12:00:00Z"
  }
}
```

---

### 12. Accept Loft Invitation

**POST** `/api/user/invitations/:id/accept`

Accept a loft invitation (only by invited user).

**Parameters:**
- `id` (string, required): Invitation UUID

**Response:**
```json
{
  "message": "Invitation accepted successfully.",
  "data": {
    "id": "uuid",
    "name": "Shared Loft",
    "location": "California",
    "loftId": "LOFT-2",
    "userId": "other_user_uuid",
    "sharedWith": [
      {
        "id": "uuid",
        "userId": "current_user_uuid",
        "loftId": "uuid"
      }
    ]
  }
}
```

---

### 13. Reject Loft Invitation

**POST** `/api/user/invitations/:id/reject`

Reject a loft invitation (only by invited user).

**Parameters:**
- `id` (string, required): Invitation UUID

**Response:**
```json
{
  "message": "Invitation rejected successfully."
}
```

---

### 14. Get Loft Invitations

**GET** `/api/user/invitations`

Get all pending loft invitations for the authenticated user.

**Response:**
```json
{
  "message": "Loft invitations retrieved successfully.",
  "data": [
    {
      "id": "uuid",
      "loftId": "uuid",
      "invitedById": "uuid",
      "invitedUserId": "uuid",
      "status": "PENDING",
      "createdAt": "2025-07-05T12:00:00Z",
      "loft": {
        "id": "uuid",
        "name": "Friend's Loft",
        "location": "California"
      },
      "invitedBy": {
        "id": "uuid",
        "name": "John Doe"
      }
    }
  ]
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 401 Unauthorized
```json
{
  "message": "Unauthorized access. Please log in."
}
```

### 400 Bad Request
```json
{
  "message": "Invalid [parameter] data.",
  "error": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["name"],
      "message": "Required"
    }
  ]
}
```

### 403 Forbidden
```json
{
  "message": "You are not authorized to [action] this [resource]."
}
```

### 404 Not Found
```json
{
  "message": "[Resource] not found."
}
```

### 500 Internal Server Error
```json
{
  "message": "An error occurred while [action].",
  "error": "Detailed error message"
}
```

---

## Data Models

### BirdGender Enum
- `MALE`
- `FEMALE`

### BirdStatus Enum
- `ACTIVE`
- `MISSING`
- `HOSPITALIZED`

### RaceStatus Enum
- `UPCOMING`
- `LIVE`
- `COMPLETED`

### EntryStatus Enum
- `PENDING`
- `PAID`
- `CANCELLED`

### BirdRaceStatus Enum
- `UNKNOWN`
- `ARRIVED`
- `DISQUALIFIED`
- `RETIRED`
- `MISSING`

### PaymentStatus Enum
- `PENDING`
- `SUCCESS`
- `FAILED`

### InvitationStatus Enum
- `PENDING`
- `ACCEPTED`
- `DECLINED`
- `EXPIRED`

---
