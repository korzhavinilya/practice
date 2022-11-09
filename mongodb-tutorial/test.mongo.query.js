students = [
  {
    firstName: 'Svetlana',
    lastName: 'Korzhavina',
    email: 'lucia@gmail.com',
    gender: 'f',
    favoriteSubjects: ['maths', 'english'
    ],
  },
  {
    firstName: 'Alex',
    lastName: 'Rubis',
    email: 'rubis@gmail.com',
    gender: 'm',
    favoriteSubjects: ['maths', 'english', 'it'
    ],
  },
];


use shop;

db.createCollection('customers');
db.createCollection('orders');
db.createCollection('orderItems');

db.customers.insertMany([
  {
    customer_id: 1,
    name: 'Jim Smith',
    email: 'jim.smith@example.com',
  },
  {
    customer_id: 2,
    name: 'Bob Jones',
    email: 'bob.jones@example.com',
  },
]);

db.orders.insertMany([
  {
    order_id: 1,
    customer_id: 1,
  },
  {
    order_id: 2,
    customer_id: 1,
  },
]);

db.orderItems.insertMany([
  {
    order_item_id: 1,
    name: 'Foo',
    price: 4.99,
    order_id: 1,
  },
  {
    order_item_id: 2,
    name: 'Bar',
    price: 17.99,
    order_id: 1,
  },
  {
    order_item_id: 3,
    name: 'baz',
    price: 24.99,
    order_id: 2,
  },
]);

// Searching
// regex
db.orderItems.find({name: /ba/i
});

// Matches values that are equal to the given value.
db.orderItems.find({price: { $eq: 24.99
  }
});
db.orderItems.find({price: 24.99
});

// Matches if values are greater/less than the given value.
db.orderItems.find({price: { $gt: 17.99
  }
});
db.orderItems.find({price: { $lt: 17.99
  }
});

// Matches if values are greater/less or equal to the given value.
db.orderItems.find({price: { $gte: 17.99
  }
});
db.orderItems.find({price: { $lte: 17.99
  }
});

// And
db.orderItems.find({ $and: [
    {name: /ba/i
    },
    {price: {$gt: 17, $lte: 24.99
      }
    }
  ]
});
db.orderItems.find({name: /ba/i, price: {$gt: 17, $lte: 24.99
  }
}); // alternative

// Updating
// update a field using the value of another field
db.orderItems.update(
    {price: 4.99
},
[
  {
    "$set": {
      "name": "Foo"
    }
  }
]
)

// Aggregation

// use selected fields from collection $project
db.orderItems.aggregate([
  {
    $project : {
      order_id: true,
      name: 1,
      price: {
        default: "$price",
        multiplied: {
          $trunc: [
            {$multiply: [
                "$price",
                100
              ]
            },
            2
          ]
        },
        divided: {
          $trunc: [
            {$divide: [
                "$price",
                100
              ]
            },
            2
          ]
        },
      }
    },
  }
])

/**
 * grouping 
 * 
 * SELECT order_id, COUNT(order_id) as count 
 * FROM orderItems
 * WHERE name = /ba/i OR name = '/fo/i
 * GROUP BY order_id
 */

db.orderItems.aggregate( [
  {
     $match: { $or: [ {name: /ba/i}, {name: /fo/i} ]}
  },
  {
     $group: { _id: "$order_id", count: { $count: { } }}
  }
] )



// join two tables
db.orderItems.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "order_id",
      foreignField: "order_id",
      as: "orders"
    }
  },
  {
    $project : {
      name: true,
      price: 1,
      order_id: "$orders.order_id",
    }
  }
])

// join three tables
db.customers.aggregate([
  {
    $lookup: {
      from: "orders",
      let: { customer_id: "$customer_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$$customer_id", "$customer_id"] } } },
        {
          $lookup: {
            from: "orderitems",
            localField: "order_id",
            foreignField: "order_id",
            as: "items"
          }
        }
      ],
      as: "orders"
    }
  }
])