import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalServers: number = 0;
  activeServers: number = 0;
  osDistribution: { [key: string]: number } = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3030/api/servers').subscribe(servers => {
      this.totalServers = servers.length;
      this.activeServers = servers.filter(s => s.status === 'Activo').length;

      // Calcular distribución por sistema operativo
      this.osDistribution = servers.reduce((acc, server) => {
        acc[server.os] = (acc[server.os] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });

      this.loadChart(); // Cargar gráfico después de obtener los datos
    });
  }

  loadChart() {
    const ctx = document.getElementById('osChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(this.osDistribution),
          datasets: [{
            label: 'Cantidad de Servidores',
            data: Object.values(this.osDistribution),
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true
            }
          }
        } as ChartOptions
      });
    }
  }
}
