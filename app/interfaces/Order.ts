import {OrderItem} from "@/app/interfaces/OrderItem";

export interface Order {
    total: number
    orderItems: OrderItem[]
}