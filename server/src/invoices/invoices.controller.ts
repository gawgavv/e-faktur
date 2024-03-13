import { NextFunction, Request, Response, Router } from 'express';

import { InvoiceService } from './invoices.service';

export class InvoiceController {

    public router: Router;

    private readonly invoiceService: InvoiceService;

    constructor(
        invoiceService: InvoiceService
    ) {
        this.invoiceService = invoiceService;

        this.router = Router();

        this.router.route(`/invoices`)
        .get(this.listInvoicesRequestHandler)
        .post(this.publishInvoicesRequestHandler);

        this.router.route(`/invoices/:id`)
        .get(this.invoiceDetailRequestHandler);

        this.router.route(`/statistics`)
        .get();

        this.router.route(`/products`)
        .get(this.listProductsRequestHandler);

        this.router.route(`/customers`)
        .get(this.listCustomersRequestHandler);

        this.router.route(`/sales-people`)
        .get(this.listSalesPeopleRequestHandler);
    }

    async listInvoicesRequestHandler(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (err) {
            next(err);
        }
    }

    async invoiceDetailRequestHandler(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (err) {
            next(err);
        }
    }

    async publishInvoicesRequestHandler(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (err) {
            next(err);
        }
    }

    async listProductsRequestHandler(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (err) {
            next(err);
        }
    }

    async listCustomersRequestHandler(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (err) {
            next(err);
        }
    }

    async listSalesPeopleRequestHandler(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (err) {
            next(err);
        }
    }

}

export default new InvoiceController(new InvoiceService());