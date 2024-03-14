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

    public listInvoicesRequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
        } catch (err) {
            next(err);
        }
    }

    public invoiceDetailRequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
        } catch (err) {
            next(err);
        }
    }

    public publishInvoicesRequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
        } catch (err) {
            next(err);
        }
    }

    public listProductsRequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
        } catch (err) {
            next(err);
        }
    }

    public listCustomersRequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
        } catch (err) {
            next(err);
        }
    }

    public listSalesPeopleRequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
        } catch (err) {
            next(err);
        }
    }

}

export default new InvoiceController(new InvoiceService());