// Initialize localStorage with demo data
export function initializeLocalStorage() {
  if (!localStorage.getItem("vvUsers")) {
    localStorage.setItem(
      "vvUsers",
      JSON.stringify([
        {
          email: "demo@vastraview.com",
          password: "demo123",
          gender: "female",
          outfits: [{ top: "shirt_1", bottom: "jeans_1", accessories: ["watch_1"] }],
        },
      ]),
    )
  }
}

// Handle user sign up
export function handleSignUp(email: string, password: string): boolean {
  const users = JSON.parse(localStorage.getItem("vvUsers") || "[]")

  // Check if user already exists
  if (users.some((user: any) => user.email === email)) {
    return false
  }

  // Add new user
  users.push({
    email,
    password,
    outfits: [],
    gender: null,
  })

  localStorage.setItem("vvUsers", JSON.stringify(users))
  localStorage.setItem("vvCurrentUser", email)

  return true
}

// Handle user login
export function handleLogin(email: string, password: string): boolean {
  const users = JSON.parse(localStorage.getItem("vvUsers") || "[]")

  // Find user with matching email and password
  const user = users.find((u: any) => u.email === email && u.password === password)

  if (user) {
    localStorage.setItem("vvCurrentUser", email)
    return true
  }

  return false
}

// Get current user data
export function getCurrentUser() {
  const email = localStorage.getItem("vvCurrentUser")
  if (!email) return null

  const users = JSON.parse(localStorage.getItem("vvUsers") || "[]")
  return users.find((u: any) => u.email === email) || null
}

// Save outfit for current user
export function saveOutfit(items: any) {
  const email = localStorage.getItem("vvCurrentUser")
  if (!email) return false

  const users = JSON.parse(localStorage.getItem("vvUsers") || "[]")
  const userIndex = users.findIndex((u: any) => u.email === email)

  if (userIndex === -1) return false

  if (!users[userIndex].outfits) {
    users[userIndex].outfits = []
  }

  users[userIndex].outfits.push(items)
  localStorage.setItem("vvUsers", JSON.stringify(users))

  return true
}

// Update user gender
export function updateUserGender(gender: string) {
  const email = localStorage.getItem("vvCurrentUser")
  if (!email) return false

  const users = JSON.parse(localStorage.getItem("vvUsers") || "[]")
  const userIndex = users.findIndex((u: any) => u.email === email)

  if (userIndex === -1) return false

  users[userIndex].gender = gender
  localStorage.setItem("vvUsers", JSON.stringify(users))

  return true
}

// Logout current user
export function logout() {
  localStorage.removeItem("vvCurrentUser")
}
