import type { FoodItem } from '../types/food'

export type NutritionCategory = 'weight_gain' | 'weight_loss' | 'diabetic_friendly'

export interface CategoryMeta {
  id: NutritionCategory
  name: string
  shortName: string
  description: string
  icon: string
  tag: string
  criteriaTitle: string
  criteriaDescription: string
  safetyDisclaimer: string
}

export const NUTRITION_CATEGORIES: Record<NutritionCategory, CategoryMeta> = {
  weight_gain: {
    id: 'weight_gain',
    name: 'Weight Gain',
    shortName: 'Weight Gain',
    description: 'Discover nourishing foods to support healthy weight gain.',
    icon: '⚡',
    tag: 'Calorie & Nutrient Dense',
    criteriaTitle: 'Energy Density & Muscle-Supporting Nutrients',
    criteriaDescription:
      'Prioritizes energy-dense, nutrient-rich whole foods with healthy fats, quality proteins, and complex carbohydrates (≥250 kcal/100g, or ≥150 kcal with high protein/healthy fats, such as nuts, seeds, whole grains, and lean roasted poultry).',
    safetyDisclaimer:
      'General dietary guidance only. Healthy weight gain requires an overall caloric surplus combined with adequate protein intake and progressive resistance training. Not intended as medical advice.',
  },
  weight_loss: {
    id: 'weight_loss',
    name: 'Weight Loss',
    shortName: 'Weight Loss',
    description: 'Explore balanced, nutrient-rich foods for your weight-management goals.',
    icon: '🎯',
    tag: 'High Satiety & Calorie-Controlled',
    criteriaTitle: 'Satiety, Volume & Caloric Efficiency',
    criteriaDescription:
      'Prioritizes high-satiety, low-to-moderate calorie density foods (≤140 kcal/100g) including fresh non-starchy vegetables, whole fruits, boiled pulses, and lean high-protein sources (≥20g protein per 100g with low fat, such as chicken breast and egg whites).',
    safetyDisclaimer:
      'General dietary guidance only. Sustainable weight management depends on an overall calorie-controlled, balanced diet and consistent physical activity. Individual metabolic rates and caloric requirements vary.',
  },
  diabetic_friendly: {
    id: 'diabetic_friendly',
    name: 'Diabetic-Friendly Foods',
    shortName: 'Diabetic-Friendly',
    description: 'Explore balanced food options to support mindful blood-glucose management.',
    icon: '🌿',
    tag: 'Low Glycemic & High Fiber',
    criteriaTitle: 'Low Glycemic Impact & High Fiber Retention',
    criteriaDescription:
      'Prioritizes foods with low available carbohydrates (≤10g per 100g/serving), or foods rich in soluble fiber and protein (boiled legumes, nuts/seeds, low-GI fruits) that blunt postprandial glucose excursions. Refined flours and high-GI white rice are excluded.',
    safetyDisclaimer:
      'Dietary guidance notice: Not a medical diagnosis, cure, or treatment for diabetes. Individual blood-glucose responses differ based on portion size, meal composition, and metabolic profile. Consult your certified healthcare professional or registered dietitian.',
  },
}

/**
 * Deterministically classifies an existing food record into zero, one, or multiple
 * nutrition goal categories based on verified macronutrient values and serving metrics.
 *
 * Rules adhere strictly to Section 3 and Section 7 requirements:
 * - Uses actual numeric nutritional data: calories, protein, carbohydrates, fat, prep state, category.
 * - Multi-category assignment is fully supported.
 * - Excludes refined high-glycemic carbohydrates from diabetic-friendly.
 */
export function classifyFood(food: FoodItem): NutritionCategory[] {
  const cal = Number(food.calories)
  const p = Number(food.protein)
  const c = Number(food.carbohydrates)
  const f = Number(food.fat)
  const cat = food.category
  const name = food.name.toLowerCase()
  const prep = food.preparation_state.toLowerCase()

  const matchedCategories: NutritionCategory[] = []

  // 1. WEIGHT GAIN CLASSIFICATION
  // Criteria: Energy density >= 250 kcal/100g OR calorie-dense proteins/fats/complex staples
  if (cal >= 250) {
    // Nuts, seeds, dry whole grains, dry legumes, butter
    matchedCategories.push('weight_gain')
  } else if (cal >= 150 && (p >= 15 || f >= 10)) {
    // Roasted poultry (165 kcal, 31g P), Boiled chickpeas (164 kcal, 8.9g P)
    matchedCategories.push('weight_gain')
  } else if (cat === 'Nuts & Seeds') {
    matchedCategories.push('weight_gain')
  } else if (
    name.includes('butter') ||
    name.includes('whole milk') ||
    name.includes('cottage cheese')
  ) {
    matchedCategories.push('weight_gain')
  }

  // 2. WEIGHT LOSS CLASSIFICATION
  // Criteria: High satiety per calorie, low-to-moderate calorie density (<= 140 kcal/100g),
  // or high-protein efficiency with controlled calories
  if (cal <= 140) {
    // Non-starchy vegetables, low-cal fruits, boiled legumes, cooked rice, eggs, low-cal dairy
    matchedCategories.push('weight_loss')
  } else if (p >= 20 && cal <= 180) {
    // Roasted chicken breast (165 kcal, 31g protein: maximum protein satiety per calorie)
    matchedCategories.push('weight_loss')
  } else if ((cat === 'Vegetables' || cat === 'Fruits') && cal <= 100) {
    matchedCategories.push('weight_loss')
  }

  // 3. DIABETIC-FRIENDLY CLASSIFICATION
  // Criteria: Low glycemic impact:
  // - Low carbohydrate content (<= 10g per 100g or serving)
  // - High-fiber boiled legumes with slow digestion rate
  // - Healthy-fat nuts/seeds that blunt glucose spikes
  // - Low-GI fresh fruits (apple, papaya, guava)
  // Excluded: Refined grains (white rice raw/cooked, refined wheat flour, high-GI potatoes)
  const isRefinedCarbOrHighGiStarch =
    name.includes('white rice') ||
    name.includes('wheat flour') ||
    name.includes('potatoes')

  if (!isRefinedCarbOrHighGiStarch) {
    if (c <= 10.0) {
      // Poultry (0g), Eggs (0.4-0.6g), Spinach (3.6g), Tomatoes (3.9g), Cucumbers (3.6g),
      // Cauliflower (5g), Broccoli (6.6g), Cabbage (5.8g), Okra (7.5g), Onions (9.3g),
      // Carrots (9.6g), Milk (4.8g), Yogurt (4.7g), Cottage cheese (3.4g)
      matchedCategories.push('diabetic_friendly')
    } else if (cat === 'Nuts & Seeds' && c <= 25.0) {
      // Walnuts (13.7g C, 65g healthy fat), Peanuts (16.1g C, 25.8g P), Almonds (21.6g C, high fiber)
      matchedCategories.push('diabetic_friendly')
    } else if (prep === 'boiled' && cat === 'Legumes & Pulses') {
      // Boiled lentils, boiled mung beans, boiled black/kidney/chickpea beans (high soluble fiber)
      matchedCategories.push('diabetic_friendly')
    } else if (
      cat === 'Fruits' &&
      c <= 15.0 &&
      (name.includes('apple') || name.includes('guava') || name.includes('papaya'))
    ) {
      // High-pectin, low glycemic load fruits
      matchedCategories.push('diabetic_friendly')
    } else if (name.includes('chia')) {
      // Chia seeds (high soluble mucilage fiber)
      matchedCategories.push('diabetic_friendly')
    }
  }

  return matchedCategories
}

/**
 * Calculates category food counts from an array of loaded FoodItems.
 */
export function getCategoryCounts(foods: FoodItem[]): Record<NutritionCategory, number> {
  const counts: Record<NutritionCategory, number> = {
    weight_gain: 0,
    weight_loss: 0,
    diabetic_friendly: 0,
  }

  for (const food of foods) {
    const cats = classifyFood(food)
    for (const c of cats) {
      counts[c] += 1
    }
  }

  return counts
}

/**
 * Filters an array of foods by selected nutrition goal category.
 * If 'all', returns the original array.
 */
export function filterByNutritionCategory(
  foods: FoodItem[],
  selectedCategory: NutritionCategory | 'all',
): FoodItem[] {
  if (selectedCategory === 'all') {
    return foods
  }
  return foods.filter((food) => classifyFood(food).includes(selectedCategory))
}
