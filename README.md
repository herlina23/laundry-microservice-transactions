# Microservice-Transactions
## Endpoints

### Service (/api/v1/services)

#### Get all services
```bash
GET / 
# authorization: admin
# Return
# {
#      "create_date": "2019-02-27T00:15:00.511Z",
#       "_id": "5c75d7cf5e410d2afc5ae211",
#       "serviceName": "Cuci Kering",
#       "days": 3,
#       "unit": "kg",
#       "tarif": 6000,
#       "__v": 0
# }
```

#### Get a service
```bash
GET /:id
# authorization: admin
```

#### Create a service
```bash
POST /
# authorization: admin
#Request Sample
# {
#   "service": {
#       "serviceName": "Cuci Kering",
#       "days": 3,
#       "unit": "kg",
#       "tarif": 6000
#   }
# }
```

#### Update a service
```bash
PUT /:id
# authorization: admin
```

#### Delete a service
```bash
DELETE /:id
# authorization: admin
```

### Transaction (/api/v1/transactions)

#### Get all transactions
```bash
GET / 
# authorization: all
# Return
# {
#      "dateIn": "2019-02-27T06:39:52.747Z",
#      "dateOut": null,
#      "discount": 0,
#      "grandTotal": 0,
#      "paymentStatus": "belum lunas",
#      "recepient": null,
#      "_id": "5c7630d32ffca238b42ac868",
#      "member": {
#           "create_date": "2019-02-25T09:51:42.963Z",
#           "_id": 1,
#           "member_name": "daffa",
#           "phone": "085123456789",
#           "address": "Malang city",
#           "member_id": "MEM1",
#           "__v": 0
#       },
#       "user": {
#           "create_date": "2019-02-25T07:45:00.043Z",
#           "_id": "5c739d960f64700ff05ed8ac",
#           "username": "admin",
#           "password": "$2a$10$OGS4haHAOFKMPj/Pw0Stl.cEgYZlvxyvAXMWlEBeA4r2DPcJLjsDC",
#           "role": "admin",
#           "__v": 0
#       },
#       "invoice": "gyY1G9dHm",
#       "__v": 0
#   }
```

#### Get a transaction
```bash
GET /:id
# authorization: all
```

#### Search a transaction with invoice
```bash
GET /search/:invoice
# authorization: all
```

#### Search a transaction with phone
```bash
GET /phone/:phone
# authorization: all
```

#### Create a transaction
```bash
POST /
# authorization: admin
#Request Sample
# {
#   "transaction": {
#       "member":1
#   }
# }
```

#### Update a transaction
```bash
PUT /:id
# authorization: admin
```

#### Delete a transaction
```bash
DELETE /:id
# authorization: admin
```

### Detail (/api/v1/details)

#### Get all details
```bash
GET / 
# authorization: all
# Return
# {
#       "process": "Baru",
#       "_id": "5c7635fd0868e01c404ce3e5",
#       "transaction": {
#           "dateIn": "2019-02-27T06:39:52.747Z",
#           "dateOut": null,
#           "discount": 0,
#           "grandTotal": 0,
#           "paymentStatus": "belum lunas",
#           "recepient": null,
#           "_id": "5c7630d32ffca238b42ac868",
#           "member": 1,
#           "user": "5c739d960f64700ff05ed8ac",
#           "invoice": "gyY1G9dHm",
#           "__v": 0
#       },
#       "service": {
#           "create_date": "2019-02-27T00:15:00.511Z",
#           "_id": "5c75d7cf5e410d2afc5ae211",
#           "serviceName": "Cuci Kering",
#           "days": 3,
#           "unit": "kg",
#           "tarif": 6000,
#           "__v": 0
#      },
#       "qty": 5,
#       "__v": 0
# }
```

#### Get a detail
```bash
GET /:id
# authorization: all
```

#### Create a detail
```bash
POST /
# authorization: all
#Request Sample
# {
#   "detail": {
#       "transaction": "5c7630d32ffca238b42ac868",
#       "service": "5c75d7cf5e410d2afc5ae211",
#       "qty": 5
#   }
# }
```

#### Update a detail
```bash
PUT /:id
# authorization: all
```

#### Delete a detail
```bash
DELETE /:id
# authorization: all
```