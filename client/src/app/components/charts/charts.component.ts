import { Component, OnInit, inject } from '@angular/core';
import Chart, {registerables} from 'chart.js/auto';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  standalone: true
})
export class ChartsComponent implements OnInit {
  private invoiceService = inject(InvoiceService);

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadInvoiceStatusChart();
    this.loadRevenueChart();
  }

  loadInvoiceStatusChart(): void {
    this.invoiceService.getInvoiceStatusBreakdown().subscribe(data => {
      new Chart('invoiceStatusChart', {
        type: 'pie',
        data: {
          labels: ['Paid', 'Pending', 'Overdue'],
          datasets: [{
            data: [data.paid, data.pending, data.overdue],
            backgroundColor: ['#28a745', '#ffc107', '#dc3545']
          }]
        }
      });
    });
  }

  loadRevenueChart(): void {
    this.invoiceService.getRevenueOverTime().subscribe(data => {
      new Chart('revenueChart', {
        type: 'line',
        data: {
          labels: data.dates,
          datasets: [{
            label: 'Revenue ($)',
            data: data.revenue,
            borderColor: '#007bff',
            fill: false
          }]
        }
      });
    });
  }
}
