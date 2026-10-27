export type ReferenceBasis = 'per_100g' | 'per_100ml' | 'per_serving'
export type ReviewStatus = 'draft' | 'verified' | 'archived'

export interface FoodItem {
  id: string
  name: string
  category: string
  preparation_state: string
  food_type: string
  nutrition_reference_basis: ReferenceBasis
  serving_size: number
  serving_unit: string
  serving_weight_g: number | null
  serving_volume_ml: number | null
  calories: number
  protein: number
  carbohydrates: number
  fat: number
  source_name: string
  source_code: string | null
  source_data_type: string | null
  source_release_version: string | null
  data_review_status: ReviewStatus
  is_system: boolean
  created_at: string
  updated_at: string
}

export interface FoodCatalogListResponse {
  items: FoodItem[]
  total: number
  limit: number
  offset: number
}
