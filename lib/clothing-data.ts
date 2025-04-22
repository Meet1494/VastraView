// Mock clothing data with enhanced properties for virtual try-on
const clothingData = {
  tops: {
    male: [
      {
        id: "top_m_1",
        name: "Classic White Shirt",
        description: "A timeless white button-up shirt for any occasion",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["S", "M", "L", "XL"],
        price: 49.99,
        tryOnEnabled: true,
        category: "shirt",
      },
      {
        id: "top_m_2",
        name: "Navy Polo",
        description: "Comfortable navy polo shirt with breathable fabric",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["S", "M", "L", "XL", "XXL"],
        price: 39.99,
        tryOnEnabled: true,
        category: "shirt",
      },
      {
        id: "top_m_3",
        name: "Graphic Tee",
        description: "Cool graphic t-shirt with modern design",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["XS", "S", "M", "L", "XL"],
        price: 29.99,
        tryOnEnabled: true,
        category: "shirt",
      },
      {
        id: "top_m_4",
        name: "Denim Jacket",
        description: "Classic denim jacket with vintage wash",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["S", "M", "L", "XL"],
        price: 79.99,
        tryOnEnabled: true,
        category: "jacket",
      },
      {
        id: "top_m_5",
        name: "Striped Sweater",
        description: "Warm striped sweater for cooler days",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["S", "M", "L", "XL"],
        price: 59.99,
        tryOnEnabled: true,
        category: "shirt",
      },
      {
        id: "top_m_6",
        name: "Hoodie",
        description: "Comfortable hoodie for casual wear",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["S", "M", "L", "XL", "XXL"],
        price: 54.99,
        tryOnEnabled: true,
        category: "jacket",
      },
    ],
    female: [
      {
        id: "top_f_1",
        name: "Blouse",
        description: "Elegant blouse with floral pattern",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["XS", "S", "M", "L"],
        price: 49.99,
        tryOnEnabled: true,
        category: "shirt",
      },
      {
        id: "top_f_2",
        name: "Crop Top",
        description: "Stylish crop top for summer days",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["XS", "S", "M", "L"],
        price: 29.99,
        tryOnEnabled: true,
        category: "shirt",
      },
      {
        id: "top_f_3",
        name: "Cardigan",
        description: "Soft cardigan for layering",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["S", "M", "L", "XL"],
        price: 59.99,
        tryOnEnabled: true,
        category: "jacket",
      },
      {
        id: "top_f_4",
        name: "Tank Top",
        description: "Basic tank top for everyday wear",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["XS", "S", "M", "L", "XL"],
        price: 24.99,
        tryOnEnabled: true,
        category: "shirt",
      },
      {
        id: "top_f_5",
        name: "Off-Shoulder Top",
        description: "Trendy off-shoulder top for a night out",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["S", "M", "L"],
        price: 44.99,
        tryOnEnabled: true,
        category: "shirt",
      },
      {
        id: "top_f_6",
        name: "Turtleneck",
        description: "Cozy turtleneck for winter",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["S", "M", "L", "XL"],
        price: 49.99,
        tryOnEnabled: true,
        category: "shirt",
      },
    ],
    "non-binary": [
      {
        id: "top_nb_1",
        name: "Oversized Tee",
        description: "Comfortable oversized t-shirt",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        price: 34.99,
        tryOnEnabled: true,
        category: "shirt",
      },
      {
        id: "top_nb_2",
        name: "Button-Up Shirt",
        description: "Versatile button-up shirt with modern cut",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["XS", "S", "M", "L", "XL"],
        price: 54.99,
        tryOnEnabled: true,
        category: "shirt",
      },
      {
        id: "top_nb_3",
        name: "Sweatshirt",
        description: "Cozy sweatshirt for casual days",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["S", "M", "L", "XL", "XXL"],
        price: 49.99,
        tryOnEnabled: true,
        category: "shirt",
      },
      {
        id: "top_nb_4",
        name: "Flannel Shirt",
        description: "Classic flannel shirt with soft fabric",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["XS", "S", "M", "L", "XL"],
        price: 59.99,
        tryOnEnabled: true,
        category: "shirt",
      },
      {
        id: "top_nb_5",
        name: "Sleeveless Top",
        description: "Sleeveless top for warm weather",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["XS", "S", "M", "L", "XL"],
        price: 29.99,
        tryOnEnabled: true,
        category: "shirt",
      },
      {
        id: "top_nb_6",
        name: "Knit Sweater",
        description: "Comfortable knit sweater for any season",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["S", "M", "L", "XL"],
        price: 64.99,
        tryOnEnabled: true,
        category: "jacket",
      },
    ],
  },
  bottoms: {
    male: [
      {
        id: "bottom_m_1",
        name: "Slim Jeans",
        description: "Classic slim fit jeans in dark wash",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["28", "30", "32", "34", "36"],
        price: 59.99,
        tryOnEnabled: true,
        category: "pants",
      },
      {
        id: "bottom_m_2",
        name: "Chinos",
        description: "Comfortable chinos for work or casual wear",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["28", "30", "32", "34", "36", "38"],
        price: 49.99,
        tryOnEnabled: true,
        category: "pants",
      },
      {
        id: "bottom_m_3",
        name: "Joggers",
        description: "Stylish joggers for active lifestyle",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["S", "M", "L", "XL"],
        price: 44.99,
        tryOnEnabled: true,
        category: "pants",
      },
      {
        id: "bottom_m_4",
        name: "Shorts",
        description: "Casual shorts for summer days",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["28", "30", "32", "34", "36"],
        price: 39.99,
        tryOnEnabled: true,
        category: "shorts",
      },
    ],
    female: [
      {
        id: "bottom_f_1",
        name: "Skinny Jeans",
        description: "Classic skinny jeans with high waist",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["24", "26", "28", "30", "32"],
        price: 59.99,
        tryOnEnabled: true,
        category: "pants",
      },
      {
        id: "bottom_f_2",
        name: "A-Line Skirt",
        description: "Elegant A-line skirt for any occasion",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["XS", "S", "M", "L"],
        price: 49.99,
        tryOnEnabled: true,
        category: "skirt",
      },
      {
        id: "bottom_f_3",
        name: "Leggings",
        description: "Comfortable leggings for workout or casual wear",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["XS", "S", "M", "L", "XL"],
        price: 34.99,
        tryOnEnabled: true,
        category: "pants",
      },
      {
        id: "bottom_f_4",
        name: "Wide Leg Pants",
        description: "Stylish wide leg pants with high waist",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["XS", "S", "M", "L"],
        price: 64.99,
        tryOnEnabled: true,
        category: "pants",
      },
    ],
    "non-binary": [
      {
        id: "bottom_nb_1",
        name: "Cargo Pants",
        description: "Versatile cargo pants with multiple pockets",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        price: 69.99,
        tryOnEnabled: true,
        category: "pants",
      },
      {
        id: "bottom_nb_2",
        name: "Relaxed Jeans",
        description: "Comfortable relaxed fit jeans",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["28", "30", "32", "34", "36", "38"],
        price: 59.99,
        tryOnEnabled: true,
        category: "pants",
      },
      {
        id: "bottom_nb_3",
        name: "Track Pants",
        description: "Sporty track pants for active days",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["XS", "S", "M", "L", "XL"],
        price: 49.99,
        tryOnEnabled: true,
        category: "pants",
      },
      {
        id: "bottom_nb_4",
        name: "Utility Shorts",
        description: "Functional utility shorts with adjustable waist",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["XS", "S", "M", "L", "XL"],
        price: 44.99,
        tryOnEnabled: true,
        category: "shorts",
      },
    ],
  },
  accessories: {
    male: [
      {
        id: "acc_m_1",
        name: "Watch",
        description: "Classic analog watch with leather strap",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["One Size"],
        price: 129.99,
        tryOnEnabled: true,
        category: "watch",
      },
      {
        id: "acc_m_2",
        name: "Beanie",
        description: "Warm beanie for cold days",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["One Size"],
        price: 24.99,
        tryOnEnabled: true,
        category: "hat",
      },
      {
        id: "acc_m_3",
        name: "Sunglasses",
        description: "Stylish sunglasses with UV protection",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["One Size"],
        price: 79.99,
        tryOnEnabled: true,
        category: "glasses",
      },
      {
        id: "acc_m_4",
        name: "Tie",
        description: "Elegant tie for formal occasions",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["One Size"],
        price: 39.99,
        tryOnEnabled: true,
        category: "tie",
      },
    ],
    female: [
      {
        id: "acc_f_1",
        name: "Necklace",
        description: "Elegant pendant necklace",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["One Size"],
        price: 49.99,
        tryOnEnabled: true,
        category: "necklace",
      },
      {
        id: "acc_f_2",
        name: "Earrings",
        description: "Stylish hoop earrings",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["One Size"],
        price: 29.99,
        tryOnEnabled: true,
        category: "earrings",
      },
      {
        id: "acc_f_3",
        name: "Handbag",
        description: "Versatile handbag for everyday use",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["One Size"],
        price: 89.99,
        tryOnEnabled: false,
        category: "bag",
      },
      {
        id: "acc_f_4",
        name: "Hat",
        description: "Stylish hat with wide brim",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["One Size"],
        price: 34.99,
        tryOnEnabled: true,
        category: "hat",
      },
    ],
    "non-binary": [
      {
        id: "acc_nb_1",
        name: "Backpack",
        description: "Functional backpack with multiple compartments",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["One Size"],
        price: 79.99,
        tryOnEnabled: false,
        category: "bag",
      },
      {
        id: "acc_nb_2",
        name: "Beaded Bracelet",
        description: "Handmade beaded bracelet",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["One Size"],
        price: 19.99,
        tryOnEnabled: true,
        category: "bracelet",
      },
      {
        id: "acc_nb_3",
        name: "Bucket Hat",
        description: "Trendy bucket hat for sun protection",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["S/M", "L/XL"],
        price: 29.99,
        tryOnEnabled: true,
        category: "hat",
      },
      {
        id: "acc_nb_4",
        name: "Bandana",
        description: "Versatile bandana with pattern design",
        imageUrl: "/placeholder.svg?height=300&width=300",
        sizes: ["One Size"],
        price: 14.99,
        tryOnEnabled: true,
        category: "accessory",
      },
    ],
  },
}

// Function to get clothing items by category and gender
export function getClothingItems(category: string, gender: string) {
  if (!clothingData[category as keyof typeof clothingData]) {
    return []
  }

  const categoryData = clothingData[category as keyof typeof clothingData]
  return categoryData[gender as keyof typeof categoryData] || []
}

// Function to get clothing item by ID
export function getClothingItemById(id: string) {
  // Search through all categories and genders
  for (const category in clothingData) {
    for (const gender in clothingData[category as keyof typeof clothingData]) {
      const items = clothingData[category as keyof typeof clothingData][gender as any]
      const item = items.find((item: any) => item.id === id)
      if (item) return item
    }
  }
  return null
}

// Function to get recommended items based on selected items
export function getRecommendedItems(selectedItems: any, gender: string) {
  const recommendations = []

  // If user has selected a top, recommend matching bottoms
  if (selectedItems.top) {
    const bottoms = getClothingItems("bottoms", gender)
    // Filter to 2 recommended bottoms
    recommendations.push(...bottoms.slice(0, 2))
  }

  // If user has selected a bottom, recommend matching tops
  if (selectedItems.bottom) {
    const tops = getClothingItems("tops", gender)
    // Filter to 2 recommended tops
    recommendations.push(...tops.slice(0, 2))
  }

  // Always recommend some accessories
  const accessories = getClothingItems("accessories", gender)
  // Filter to 2 recommended accessories
  recommendations.push(...accessories.slice(0, 2))

  return recommendations.slice(0, 4) // Return max 4 recommendations
}
