export interface AttributeType {
  _id: string;
  groupName: string;
  properties: [string];
}
export interface ProductAttributeType {
  id: string;
  groupName: string;
  properties: {
    attribute_name: string;
    value: string;
  }[];
}
export interface CouponType {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  code: string;
  couponType: string;
  freeShipping: boolean;
  discount: number;
  totalUsagLimit: number;
  minCartValue: number;
  perCustomerUsed: number;
  maxDiscount: number;
  status: boolean;
  isArchived: boolean;
  categoryId: string[];
  productId: string[];
  excludedProductId: string[];
  createdAt: string;
  updatedAt: string;
}
