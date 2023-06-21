import {Method} from "../types/method.ts";

export const settings = {
    api: {
        auth: {
            registration: {
                path: "/auth/registration",
                method: "POST" as Method,
            },
            authentication: {
                path: "/auth/authentication",
                method: "POST" as Method,
            },
            googleAuthentication: {
                path: "/auth/googleLoginSignup",
                method: "POST" as Method,
            },
            verifyEmail: {
                path: "/auth/verifyEmail",
                method: "POST" as Method,
            },
            forgetPassword: {
                path: "/auth/forgetPassword",
                method: "POST" as Method
            },
            verifyForgetPasswordToken: {
                path: "/auth/verifyForgetPasswordToken",
                method: "POST" as Method
            },
            resetPassword: {
                path: "/auth/resetPassword",
                method: "POST" as Method
            }
        },
        categories: {
            findAllIngredients: {
                path: "/categories/ingredients",
                method: "GET" as Method
            },
            findAllProducts: {
                path: "/categories/products",
                method: "GET" as Method
            },
            findById: {
                path: "/categories/",
                method: "GET" as Method
            },
            newIngredientCategory: {
                path: "/categories/ingredients",
                method: "POST" as Method
            },
            newProductCategory: {
                path: "/categories/products",
                method: "POST" as Method
            },
            editCategory: {
                path: "/categories",
                method: "PUT" as Method
            },
            posibleIngredientCategoryParents: {
                path: "/categories/ingredients/container/active",
                method: "GET" as Method
            },
            posibleProductCategoryParents: {
                path: "/categories/products/container/active",
                method: "GET" as Method
            },
        },
        ingredients: {
            findAll: {
                path: "/ingredients",
                method: "GET" as Method
            },
            findById: {
                path: "/ingredients",
                method: "GET" as Method,
            },
            save: {
                path: "/ingredients",
                method: "POST" as Method
            },
            update: {
                path: "/ingredients",
                method: "PUT" as Method
            },
            purchase: {
                path: "/ingredients/purchase",
                method: "POST" as Method
            },
            updateCost: {
                path: "/ingredients/updateCost",
                method: "POST" as Method
            },
            updateStock: {
                path: "/ingredients/updateStock",
                method: "POST" as Method
            },
            findPossibleParents: {
                path: "/categories/ingredients/final/active",
                method: "GET" as Method
            },
            active: {
                path: "/ingredients/active",
                method: "GET" as Method
            }
        },
        products: {
            findAll: {
                path: "/products",
                method: "GET" as Method
            },
            findById: {
                path: "/products",
                method: "GET" as Method
            },
            save: {
                path: "/products",
                method: "POST" as Method
            },
            update: {
                path: "/products",
                method: "PUT" as Method
            },
            findPossibleParents: {
                path: "/categories/products/final/active",
                method: "GET" as Method
            },
            findPossibleIngredients: {
                path: "/ingredients/active",
                method: "GET"
            },
        },
        home: {
            findProducts: {
                path: "/products/active",
                method: "GET" as Method
            },
            findProductsByCategoryId: {
                path: "/products/active/category",
                method: "GET" as Method
            },
            findById: {
                path: "/products/client",
                method: "GET" as Method
            },
            findActiveCategories: {
                path: "/categories/products/final/active",
                method: "GET" as Method
            },
            findProductsByName: {
                path: "/products/active",
                method: "GET" as Method
            }
        },
        users: {
            findAll: {
                path: "/users",
                method: "GET" as Method
            },
            findById: {
                path: "/users",
                method: "GET" as Method
            },
            save: {
                path: "/users",
                method: "POST" as Method
            },
            update: {
                path: "/users/",
                method: "PUT" as Method
            },
            updateAsAdmin: {
                path: "/users",
                method: "PUT" as Method
            },
            profile: {
                path: "/users/profile",
                method: "GET" as Method
            },
            changePassword: {
                path: "/users/password",
                method: "PUT" as Method
            },
            sendVerificationEmail: {
                path: "/users/verifyEmail",
                method: "POST" as Method
            },
            saveImage: {
                path: "/images",
                method: "POST" as Method
            }
        },
        addresses: {
            findAll: {
                path: "/addresses",
                method: "GET" as Method
            },
            findAllActive: {
                path: "/addresses/actives",
                method: "GET" as Method
            },
            findById: {
                path: "/addresses",
                method: "GET" as Method
            },
            save: {
                path: "/addresses",
                method: "POST" as Method
            },
            update: {
                path: "/addresses",
                method: "PUT" as Method
            }
        },
        phoneNumber: {
            findAll: {
                path: "/phoneNumbers",
                method: "GET" as Method
            },
            findAllActive: {
                path: "/phoneNumbers/actives",
                method: "GET" as Method
            },
            findById: {
                path: "/phoneNumbers",
                method: "GET" as Method
            },
            save: {
                path: "/phoneNumbers",
                method: "POST" as Method
            },
            update: {
                path: "/phoneNumbers",
                method: "PUT" as Method
            }
        },
        orders: {
            findByIdForUser: {
                path: "/orders",
                method: "GET" as Method
            },
            findAllByUser: {
                path: "/orders",
                method: "GET" as Method
            },
            save: {
                path: "/orders",
                method: "POST" as Method
            },
            cashier: {
                path: "/orders/cashier",
                method: "GET" as Method
            },
            chef: {
                path: "/orders/cooking",
                method: "GET" as Method
            },
            delivery: {
                path: "/orders/delivery",
                method: "GET" as Method
            },
            findAllByAdmin: {
                path: "/orders/admin",
                method: "GET" as Method
            },
            findAllByAdminAndUser: {
                path: "/orders/admin/user",
                method: "GET" as Method
            },
            toCooking: {
                path: "/orders/newState/cooking",
                method: "PATCH" as Method
            },
            toReady: {
                path: "/orders/newState/ready",
                method: "PATCH" as Method
            },
            addMinutes: {
                path: "/orders/addMinutes",
                method: "PATCH" as Method
            },
            toDelivery: {
                path: "/orders/newState/delivery",
                method: "PATCH" as Method
            },
            toDelivered: {
                path: "/orders/newState/delivered",
                method: "PATCH" as Method
            },
            toPaid: {
                path: "/orders/registerPayment",
                method: "PATCH" as Method,
            },
            cancel: {
                path: "/orders/cancel",
                method: "POST" as Method,
            },
            getPreference: {
                path: "/mercadoPago/createPreference",
                method: "POST" as Method
            }
        },
        reports: {
            rankingProducts: {
                path: "/reports/rankingProducts",
                method: "GET" as Method
            },
            rankingProductsExcel: {
                path: "/reports/rankingProductsExcel",
                method: "GET" as Method
            },
            rankingClients: {
                path: "/reports/rankingClients",
                method: "GET" as Method
            },
            rankingClientsExcel: {
                path: "/reports/rankingClientsExcel",
                method: "GET" as Method
            },
            profits: {
                path: "/reports/profits",
                method: "GET" as Method
            },
            profitsExcel: {
                path: "/reports/profitsExcel",
                method: "GET" as Method
            }
        }
    },
    google: {
        clientId:
            "884827796185-0a0kvmu2gj381vvnfmh7ekd8j3a2o613.apps.googleusercontent.com"
    }
}
