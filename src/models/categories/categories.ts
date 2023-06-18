export interface Category {
    id: string,
    name: string,
    active: boolean,
    container: boolean,
    subCategories: Category[]
}

