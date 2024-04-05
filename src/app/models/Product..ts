export interface Product {
    id: number
    name: string
    price: number
    active: boolean
    updated_at: Date
    created_at: Date
    actions?: string 
}