import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { AsyncPipe, CurrencyPipe, NgClass } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';
import { PaginatedResponse } from '../../interfaces/paginated-response.interface';
import { Invoice } from '../../interfaces/invoice.interface';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgClass]
})
export class InvoicesComponent implements OnInit {
  currentPage = 1;
  pageSize = 10;
  private pageChange = new BehaviorSubject<{page: number, perPage: number}>({page: this.currentPage, perPage: this.pageSize});
  invoices$: Observable<PaginatedResponse<Invoice>>;

  constructor(private invoiceService: InvoiceService) {
    // Create an observable stream that responds to page changes
    this.invoices$ = this.pageChange.pipe(
      switchMap(({page, perPage}) =>
        this.invoiceService.getInvoicesPaginated(page, perPage)
      )
    );
  }

  ngOnInit(): void {
    // Initial load using default page and size
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.pageChange.next({page: this.currentPage, perPage: this.pageSize});
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadInvoices();
  }

  changePageSize(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.pageSize = Number(select.value);
    this.currentPage = 1; // Reset to first page when changing page size
    this.loadInvoices();
  }

  getPageNumbers(lastPage: number): number[] {
    // Generate page numbers with smart limiting for many pages
    const maxVisiblePages = 5;
    const pageNumbers: number[] = [];

    if (lastPage <= maxVisiblePages) {
      // Show all pages if there are few
      for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show a window around current page for many pages
      const startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(lastPage, startPage + maxVisiblePages - 1);

      // Add first page if not included
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push(-1); // -1 represents ellipsis
      }

      // Add pages around current page
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add last page if not included
      if (endPage < lastPage) {
        if (endPage < lastPage - 1) pageNumbers.push(-1); // -1 represents ellipsis
        pageNumbers.push(lastPage);
      }
    }

    return pageNumbers;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'paid':
        return 'bg-success';
      case 'pending':
        return 'bg-warning text-dark';
      case 'overdue':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  addInvoice(): void {
    // Implement add invoice functionality
  }

  editInvoice(invoice: Invoice): void {
    // Implement edit invoice functionality
  }

  deleteInvoice(id: number): void {
    // Implement delete invoice functionality
    // After successful deletion, refresh the current page
    this.loadInvoices();
  }
}
