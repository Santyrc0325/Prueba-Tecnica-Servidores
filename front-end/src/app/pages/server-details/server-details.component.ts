import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-server-details',
  imports: [CommonModule],
  templateUrl: './server-details.component.html',
  styleUrls: ['./server-details.component.css']
})
export class ServerDetailsComponent implements OnInit {
  server: any = null;

  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadServer(id);
  }

  loadServer(id: number) {
    this.serverService.getServerById(id).subscribe({
      next: (data) => {
        this.server = data;
      },
      error: (err) => {
        console.error('Error al cargar el servidor:', err);
      }
    });
  }

  updateServer() {
    if (this.server) {
      this.serverService.updateServer(this.server.id, this.server).subscribe({
        next: () => {
          alert('Servidor actualizado correctamente.');
          this.router.navigate(['/servers']);
        },
        error: (err) => {
          console.error('Error al actualizar el servidor:', err);
        }
      });
    }
  }
}
