// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood {

  constructor(name) {
    this.id = ++neighborhoodId
    this.name = name
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery =>  delivery.neighborhoodId === this.id)
  }

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }

  meals() {
    let mealIds = this.deliveries().map( delivery => delivery.mealId)

    let meals = []
    mealIds.forEach( mealId => {
      store.meals.forEach( meal => {
        if(meal.id === mealId) {
          meals.push(meal)
        }
      })
    })
    return meals.filter((value, index, self) => self.indexOf(value) === index)
  }
}

class Customer {

    constructor(name, neighborhoodId) {
      this.id = ++customerId
      this.neighborhoodId = neighborhoodId
      this.name = name
      store.customers.push(this)
    }


    totalSpent() {
      let spent = 0
      this.meals().forEach(meal => {
        spent += meal.price
      })
      return spent
    }

    deliveries() {
      return store.deliveries.filter(delivery => delivery.customerId === this.id)
    }

    meals() {
      const mealIds = this.deliveries().map(delivery => delivery.mealId)

      const meals = []
      mealIds.forEach(mealId => {
        store.meals.forEach(meal => {
          if(meal.id === mealId) {
            meals.push(meal);
          }
        })
      })
      return meals
    }

}

class Meal {

  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  static byPrice() {
    return store.meals.sort((a, b) => b.price - a.price)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers() {
    const customerIds = this.deliveries().map(delivery => delivery.customerId)

    const customers = []
    customerIds.forEach(customerId => {
      store.customers.forEach(customer => {
        if(customer.id === customerId) {
          customers.push(customer);
        }
      })
    })
    return customers
  }

}

class Delivery {

  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }

}
