import { Profile } from "../types/profile"
import { Weight } from "../types/weight"
import { Meal } from "../types/meal"
import { Macros } from "../types/macros" //

const STORAGE_KEYS = {
  profile: "profile",
  mealLogs: "mealLogs",
  weightHistory: "weightHistory",
  macros: "macros",
}

// Generic load function
const load = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (error) {
    console.error(`Error loading ${key}:`, error)
    return fallback
  }
}

// Generic save function
const save = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error saving ${key}:`, error)
  }
}

// Profile
export const loadProfile = (): Profile => {
  return load<Profile>(STORAGE_KEYS.profile, {
    gender: "male",
    userName: "",
    weight: null,
    height: null,
    age: null,
    activityLevel: "",
    goal: "",
    birthDate: "", 
    tdee: null,
  })
}


export const saveProfile = (profile: Profile) => {
  save(STORAGE_KEYS.profile, profile)
}

// Meal logs
export const loadMealLogs = (): Meal[] => {
  return load<Meal[]>(STORAGE_KEYS.mealLogs, [])
}

export const saveMealLogs = (logs: Meal[]) => {
  save(STORAGE_KEYS.mealLogs, logs)
}

// Weight history
export const loadWeightHistory = (): Weight[] => {
  return load<Weight[]>(STORAGE_KEYS.weightHistory, [])
}

export const saveWeightHistory = (history: Weight[]) => {
  save(STORAGE_KEYS.weightHistory, history)
}

export const loadMacros = (): Macros => {
  return load<Macros>(STORAGE_KEYS.macros, {
    dailyCalories: 2000,
    proteinPercentage: 15,
    carbohydratePercentage: 55,
    fatPercentage: 30,
    protein: null,
    carbohydrate: null,
    fat: null,
  })
}

export const saveMacros = (macros: Macros) => {
  save(STORAGE_KEYS.macros, macros)
}
