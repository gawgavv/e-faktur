import { Router } from 'express';

import { InvoiceService } from './invoices.service';

export class InvoiceController {

    public router: Router;

    private readonly invoiceService: InvoiceService;

    constructor(
        invoiceService: InvoiceService
    ) {
        this.invoiceService = invoiceService;
        this.router = Router();
        this.router.route(`/invoices`);
        this.router.route(`/products`);
        this.router.route(`/customers`);
        this.router.route(`/sales`);
    }
}

export default new InvoiceController(new InvoiceService());