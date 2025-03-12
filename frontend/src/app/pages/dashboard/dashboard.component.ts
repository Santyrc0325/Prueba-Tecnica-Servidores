import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalServers: number = 0;
  activeServers: number = 0;
  inactiveServers: number = 0;
  osDistribution: { name: string, count: number }[] = [];

  constructor(private serverService: ServerService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.serverService.getServers().subscribe((servers: any[]) => {
      this.totalServers = servers.length;
      this.activeServers = servers.filter(s => s.status === 'Activo').length;
      this.inactiveServers = servers.filter(s => s.status === 'Inactivo').length;

      // Calcular la distribución de sistemas operativos
      const osMap: { [key: string]: number } = {};
      servers.forEach(s => osMap[s.os] = (osMap[s.os] || 0) + 1);
      this.osDistribution = Object.keys(osMap).map(os => ({ name: os, count: osMap[os] }));

      this.renderChart();
    });
  }

  renderChart() {
    const ctx = document.getElementById('osChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.osDistribution.map(os => os.name),
        datasets: [{
          label: 'Cantidad de Servidores',
          data: this.osDistribution.map(os => os.count),
          backgroundColor: ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8']
        }]
      }
    });
  }
}
