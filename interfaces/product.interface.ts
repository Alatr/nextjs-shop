export interface ProductCharacteristic {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: ReviewModel;
}

export interface ReviewModel {
  rate: number;
  count: number;
}
