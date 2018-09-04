// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;


class Neighborhood {
  constructor(name) {
    this.id = neighborhoodId ++
    this.name = name
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
  }

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id )
  }

  meals() {
    let allDeliveries = this.deliveries()
    let allMeals = allDeliveries.map(delivery => delivery.mealId)
    return store.meals.filter(meal => allMeals.includes(meal.id))
  }
}

class Meal {
  constructor(title, price) {
    this.id = mealId ++
    this.title = title
    this.price = price
    store.meals.push(this)
  }



  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers() {
    let allDeliveries = this.deliveries()
    let customerIds = allDeliveries.map(d => d.customerId)
    return store.customers.filter(c => customerIds.includes(c.id))
  }

}

  Meal.byPrice = function(){
    let allMeals = store.meals
    return allMeals.sort(function(a, b) {
      let priceA = a.price
      let priceB = b.price
      if (priceA > priceB) {
        return -1;
      }
      if (priceA < priceB) {
        return 1;
      }
      // names must be equal
      return 0;
    })
  }

class Customer {
  constructor(name, neighborhoodId) {
    this.id = customerId ++
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  meals() {
    let allDeliveries = this.deliveries()
    let mealIds = allDeliveries.map(d => d.mealId)
    let uniq_meals = []
    mealIds.forEach(mealId => {
        uniq_meals.push(store.meals.find(meal => mealId === meal.id))
      })
    return uniq_meals
  }

  totalSpent() {
    let allMeals = this.meals()

    let allPrices = allMeals.map(meal => meal.price)
    return allPrices.reduce((a, b) => a + b, 0)
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = deliveryId ++
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }

  customer() {
    return store.customers.find(c => c.id === this.customerId)
  }

  neighborhood() {
    return store.neighborhoods.find(n => n.id === this.neighborhoodId)
  }
}
