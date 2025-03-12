import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-servers',
  standalone: false,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  servers: any[] = [];

  constructor(private serverService: ServerService) {}

  ngOnInit(): void {
    this.loadServers();
  }

  loadServers() {
    this.serverService.getServers().subscribe({
      next: (data) => {
        this.servers = data;
      },
      error: (err) => {
        console.error('Error al cargar servidores:', err);
      }
    });
  }

  deleteServer(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este servidor?')) {
      this.serverService.deleteServer(id).subscribe({
        next: () => {
          alert('Servidor eliminado correctamente.');
          this.loadServers();
        },
        error: (err) => {
          console.error('Error al eliminar el servidor:', err);
        }
      });
    }
  }
}
