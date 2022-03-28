// Fichier avec connection à la bdd totalement différent du projet, on se sert de ce fichier uniquement pour popualte la bdd de fausses données donc connection à la bdd et tout le bordel présent ici

import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js"
import products from "./data/products.js"
import User from "./models/userModel.js"
import Order from "./models/orderModel.js"
import Product from "./models/productModel.js"
import connectDB from "./config/db.js"

dotenv.config()

connectDB()

const importData = async () => {
  try {
    // Avant de tout importer, on veut s'assurer que la bdd est clean
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUser = await User.insertMany(users)

    // Si on regarde le models de user, le premier est l'admin 
    const adminUser = createdUser[ 0 ]._id

    // On rajoute le user avec la référence au adminUser pour les sample data
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log("Data imported!")
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}


const destroyData = async () => {
  try {
    // Avant de tout importer, on veut s'assurer que la bdd est clean
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log("Data destroyed!")
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

if (process.argv[ 2 ] === "-d") {
  destroyData()
} else {
  importData()
}