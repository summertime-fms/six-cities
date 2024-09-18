import { readFileSync } from "node:fs"
import { Offer } from "../../types/offer.type.js"
import { OfferType } from "../../types/offer-type.enum.js"

export class TSVReader {
  private rawData: string = ''
  constructor(
    private readonly filename: string
  ) {}

  public read() {
    this.rawData =
    readFileSync(this.filename, {encoding: 'utf-8'})
  }

  public toArray(): Offer[] {
    return this.rawData.split('\n')
    .filter(row => row.trim().length > 0)
    .map(line => line.split('\t'))
    .map(([title, description, createdData, image, type, price, category, firstname, lastname, email, avatar]) => ({
      title,
      description,
      postDate: new Date(createdData),
      image,
      type: OfferType[type as 'Buy' | 'Sell'],
      price: parseInt(price, 10),
      categories: category.split(';').map((name) => ({name})),
      user: {
        firstname,
        lastname,
        email,
        avatar
      }
    }))
  }
}
