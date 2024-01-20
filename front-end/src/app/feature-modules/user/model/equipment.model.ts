export interface Equipment {
    id: number;
    name: string;
    description: string;
    type: string;
    quantity: number;
    reservedQuantity: number;
    isSelected?: boolean;
  }