# Firebase ☁️ APIs for Vodafoodies app
### __Base URL :__

    https://us-central1-vodafoodies-e3f2f.cloudfunctions.net
    
### __Request Headers :__

_All requests must contain the following headers:_

	uid : $(LOGGED_IN_USER_FIREBASE_ID)

### __Functions :__

- 👤 [**Users**](#users)
	- [updateUserData](#updateuserdata)
	- [getInvitationCode](#getinvitationcode)
- 👨🏻‍🍳 [**Venue Data**](#venue-data)
	- [addVenue](#addvenue)
	- [listedVenues](#listedvenues)
	- [getVenueMenu](#getvenuemenu)
- ➕ [**Adding & Removing Orders**](#adding-and-removing-orders)
	- [addVenueOrder](#addvenueorder)
	- [addUserOrder](#adduserorder)
	- [deleteVenueOrder](#deleteVenueOrder)
- 📋 [**Getting Venues Orders**](#getting-venues-orders)
	- [getOpenOrders](#getopenorders)
	- [getOrderSum](#getordersum)	
	- [getVenueOrderUsers](#getvenueorderusers)
	- [getOrderItemUsers](#getorderitemusers)
	- [changeOrderStatus](#changeorderstatus)
- 🍽 [**Getting User Orders**](#getting-user-orders)
	- [getUserOrders](#getuserorders)
	- [deleteUserOrderItem](#deleteuserorderitem)
	- [deleteUserOrder](#deleteuserorder)
	

## Users

### updateUserData
>Creates a new node with the user ID if not found
>or updates the user data if the ID wasn't found

__Path :__

	POST	/updateUserData
	
__Parameters :__

```javascript
{
  $(FIREBASE_USER_ID): {
    "name": "Michael",
    "email": "michael@gmail.com",
    "img": "https://www.fb.com/path/to/image",
    "phone": "0129423243",
    "fb_profile": "https://www.fb.com/user/profile"
  }
}
```
	
__Response :__

SUCCESS: 

```javascript
STATUS_CODE: 200
{
    "status": "Success",
    "result": "User Added Successfully"
}
```

### getInvitationCode
>Generates a unique Invitation code and send it to the email provided

__Path :__

	GET	/getInvitationCode
	
__Parameters :__

```javascript
user_mail = $(USER@EMAIL.COM)
```
	
__Response :__

SUCCESS: 

```javascript
STATUS_CODE: 200
{
    "status": "Success",
    "code": "3452dc"
}
```
	

## Venue Data

### addVenue

>Cretaes a new Venue node with the venue data provided
>
>// NOT FINISHED 

__Path :__

	POST	/addVenue
	
__Parameters :__

>Object generated from this [script](https://github.com/mikeAttia/Vodafoodies-Firebase/blob/master/MenueGenerationScript/menueGenerationScript_V_0.4.js)
	
__Response :__

SUCCESS: 

```javascript
"Venue Added successfully to database"
```


### listedVenues
>Returns an array of all the listed Venues from the database including both the name and the ID of each Venue 

__Path :__

	GET	/listedVenues
	
__Parameters :__

>No parameters needed for this API
	
__Response :__

SUCCESS: 

```javascript
STATUS_CODE: 200
{
    "9dcbafe1-2cb6ba67": {
        "name": "El Tabei El Domyati",
        "img": "https://s3.amazonaws.com/elmenusV3/Photos/Normal/v3aahr8n.jpg"
    },
    "b67f667e-37699a92": {
        "name": "Sliders",
        "img": "https://s3.amazonaws.com/elmenusV3/Photos/Normal/iyvcgcov89kvs4i.jpg"
    },
    "cc795c05-01ae11ff": {
        "name": "Majesty",
        "img": "https://s3.amazonaws.com/elmenusV3/Photos/Normal/i2xxnimfk9vbo6r.jpg"
    }
}
```


### getVenueMenu
>Returns the menu of the Venue with the ID provided as parameter

__Path :__

	GET	/getVenueMenu
	
__Parameters :__

```
venue_id = $(VENUE_ID)
```
	
__Response :__

SUCCESS: 

>STATUS_CODE: 200
>
>Retruns the _menue_ node from the Venue object generated from this [script](https://github.com/mikeAttia/Vodafoodies-Firebase/blob/master/MenueGenerationScript/menueGenerationScript_V_0.4.js)


## Adding And Removing Orders

### addVenueOrder
>Creates a Venue Order with the posting user as Admin for this Venue Order
>
>N.B: The user must select a user order from the venue which should be included in the request parameters

__Path :__

	POST	/addVenueOrder
	
__Parameters :__

```javascript
{
  "venue_id": $(VENUE_ID),
  "order_time": 1504196109 /*Timestamp of Order time*/,
  "order_items": [
    {
      "item_id": "itemId",
      "item_size": "size",
      "category": "category",
      "name": "item name",
      "price": 30
    }
  ]
}
```
	
__Response :__

>Redirects to [addUserOrder](#addUserOrder) to add the user order to the recently created venue order


### addUserOrder
>Adds the user Order provided to the Venue order id provided

__Path :__

	POST	/addUserOrder
	
__Parameters :__

```javascript
{
  "venue_order_id": $(VENUE_ORDER_ID),
  "order_items": [
    {
      "item_id": "itemId",
      "item_size": "size",
      "category": "category",
      "name": "item name",
      "price": 30
    }
  ]
}
```
	
__Response :__

SUCCESS: 

```javascript
STATUS_CODE: 200
{
    "status": "Success",
    "result": "User Added Successfully"
}
```

### deleteVenueOrder
>Removes the venue order and all its user orders

__Path :__

	DELETE		/deleteVenueOrder
	
__Parameters :__

```javascript
{
  "venue_order_id": $(VENUE_ORDER_ID)  
}
```
	
__Response :__

SUCCESS: 

```javascript
STATUS_CODE: 200
"Order Removed Successfully"
```



## Getting Venues Orders

### getOpenOrders
> Returns a list of all the open Orders and related data (Status & Order Time)

__Path :__

	GET	/getOpenOrders
	
__Parameters :__

>No parameters needed for this API
	
__Response :__

>N.B: *order_status* can be one of the following values:
>
- open
- cancelled
- ordered
- delivered


```javascript
STATUS_CODE: 200
{
    "result": [
        {
            "venue_order_id": "-Ktba5HwlCx9KKhYGUhI",
            "order_time": 1504977300,
            "order_status": "open",
            "venue_id": "b67f667e-37699a92",
            "venue_name": "Sliders",
            "venue_image": "https://s3.amazonaws.com/elmenusV3/Photos/Normal/iyvcgcov89kvs4i.jpg",
            "venue_phones": [
                "01098060403"
            ],
            "owner": {
                "id": "IiFLQGerlDZdzEbb2aaczAr739h2",
                "name": "Michael Attia",
                "phone": "",
                "image": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/5876082301542631921_n.jpg",
                "email": "mike-333@hotmail.com",
                "profile": "www.linktofbprofile.com/asdfasdgASASdgasSdf"
            }
        }
    ],
    "status": "Successful Request"
}
```

### getOrderSum
> Returns a list of the items in the order with the count and price of each item

__Path :__

	GET	/getOrderSum
	
__Parameters :__

````
venue_order_id = $(VENUE_ORDER_ID)
````
	
__Response :__

```javascript
STATUS_CODE: 200
{
    "status": "Successful request",
    "result": {
        "2e453f2f-5e30ccb8(ITEM_ID)": {
            "sizes": {
                "Double (SIZE_NAME)": {
                    "count": 1,
                    "price": 9
                }
            },
            "name": "Fries",
            "category": "Sides"
        },
        "2e453f2f-5e30ccb8(ITEM_ID)": {
            "sizes": {
                "Double (SIZE_NAME)": {
                    "count": 1,
                    "price": 9
                }
            },
            "name": "Fries",
            "category": "Sides"
        }
    }
}
```

### getVenueOrderUsers
> Returns a list of the users who have orders in this venue order

__Path :__

	GET	/getVenueOrderUsers
	
__Parameters :__

````
venue_order_id = $(VENUE_ORDER_ID)
````
	
__Response :__

```javascript
STATUS_CODE: 200
{
    "status": "Successful request",
    "result": [
        {
            "id": "IiFLQGerlDZdzEbb2aaczAr739h2",
            "name": "Michael Attia",
            "image": "https://scontent.xx.fbcdn.net/v/t1.0-1/42631921_n.jpg",
            "phone": "0161234613",
            "profile": "https://www.facebook.com/10155347360023787/"
        }
    ]
}
```

### getOrderItemUsers
> Returns a list of the users who ordered a certain item along with the size they ordered

__Path :__

	GET	/getOrderItemUsers
	
__Parameters :__

````
venue_order_id = $(VENUE_ORDER_ID)
item_id = $(ITEM_ID)
````
	
__Response :__

```javascript
STATUS_CODE: 200
{
    "status": "Successfull Request",
    "result": [
        {
            "size": "Single",
            "user": {
                "id": "IiFLQGerlDZdzEbb2aaczAr739h2",
                "name": "Michael Attia",
                "phone": "",
                "image": "https://scontent.xx.fbcdn.net/5876082301542631921_n.jpg",
                "email": "mike-333@hotmail.com",
                "profile": "https://www.facebook.com/10155347360023787/"
            }
        },
        {
            "size": "Double",
            "user": {
                "id": "IiFLQGerlDZdzEbb2aaczAr739h2",
                "name": "Michael Attia",
                "phone": "",
                "image": "https://scontent.xx.fbcdn.net/5876082301542631921_n.jpg",
                "email": "mike-333@hotmail.com",
                "profile": "https://www.facebook.com/10155347360023787/"
            }
        }
    ]
}
```

### changeOrderStatus
> Changes the status of the venue order id given to the status given

__Path :__

	PATCH	/changeOrderStatus
	
__Parameters :__
> N.B: status can only be
> 
- open
- cancelled
- ordered
- delivered

```javascript
{
"venue_order_id" : "ORDER_ID_HERE",
"status" = "NEW_STATUS"
}
```
	
__Response :__

```javascript
STATUS_CODE: 200
{
	"status": "success"    
}
```



## Getting User Orders

### getUserOrders
> Returns a list of all the Orders of the logged in user with related 

__Path :__

	GET	/getUserOrders
	
__Parameters :__

>If no user id was supplied , return the data of the sender user id<br>
>If no venue order id was given -> returns all the user orders from all venues

	venue_order_id = $(VENUE_ORDER_ID)
	user_id = $(USER_ID)
	
__Response :__

>N.B: *order_status* can be one of the following values:
>
- open
- cancelled
- ordered
- delivered

```javascript
STATUS_CODE: 200
{
    "status": "Successfull Request",
    "result": [
        {
            "venue_order_id": "-Ktba5HwlCx9KKhYGUhI",
            "order_time": 1504977300,
            "order_status": "open",
            "venue_id": "b67f667e-37699a92",
            "venue_name": "Sliders",
            "owner": {
                "id": "IiFLQGerlDZdzEbb2aaczAr739h2",
                "name": "Michael Attia",
                "phone": "",
                "image": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/5876082301542631921_n.jpg",
                "email": "mike-333@hotmail.com",
                "profile": "www.linktofbprofile.com/asdfasdgASASdgasSdf"
            },
            "items": [
                {
                    "category": "Sides",
                    "item_id": "2e453f2f-5e30ccb8",
                    "item_size": "Price",
                    "name": "Fries",
                    "price": 9
                }
            ]
        }
    ]
}
```

### deleteUserOrderItem
> Deletes the user order item provided from the venue order provided 

__Path :__

	DELETE		/deleteUserOrderItem
	
__Parameters :__

```javascript
{
  "venue_order_id": $(VENUE_ORDER_ID),
  "item_id" : "id of item to delete",
  "item_size" : "size of item to delete"
}
```
	
__Response :__

```javascript
STATUS_CODE: 200

Successfull Operation
```

### deleteUserOrder
> Deletes the whole user order from the venue order provided 

__Path :__

	DELETE		/deleteUserOrder
	
__Parameters :__

```javascript
{
  "venue_order_id": $(VENUE_ORDER_ID)
}
```
	
__Response :__

```javascript
STATUS_CODE: 200

User Order deleted Successfully
```



