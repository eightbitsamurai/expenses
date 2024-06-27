export class Expense {
    constructor(
        public expenseId: number,
        public userId: number,
        public categoryId: number,
        public expenseName: string,
        public expenseValue: number,
        public expenseDate: Date,
        public expenseDescription: string
    ) {}
}