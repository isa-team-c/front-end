export interface Equipment {
    id: number;
    name: string;
    description: string;
    price: number;
    type: string;
    quantity: number;
    reservedQuantity: number;
    isSelected?: boolean;
  }