export interface Image {
    id: string,
    location: string,
}
export interface CookieProduct {

    id: string,
    name: string,
    description: string,
    price: number,
    image: Image,
    stock: number

}