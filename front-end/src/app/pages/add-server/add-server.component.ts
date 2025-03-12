import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-server',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.css']
})
export class AddServerComponent implements OnInit {
  server = { name: '', os: '', ram: 8, disk_capacity: '', ip_address:'0.0.0.0', status: 'Activo' };
  isEditMode = false;
  serverId: number | null = null;

  constructor(
    private serverService: ServerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.serverId = +params['id']; // Convertir a número
        this.loadServer(this.serverId);
      }
    });
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

  saveServer() {
    if (this.isEditMode && this.serverId !== null) {
      // Modo edición: actualizar servidor existente
      this.serverService.updateServer(this.serverId, this.server).subscribe({
        next: () => {
          alert('Servidor actualizado correctamente.');
          this.router.navigate(['/servers']);
        },
        error: (err) => {
          console.error('Error al actualizar el servidor:', err);
        }
      });
    } else {
      // Modo creación: agregar nuevo servidor
      this.serverService.addServer({
        name: this.server.name,
        os: this.server.os,
        ram: this.server.ram,
        disk_capacity: this.server.disk_capacity,
        ip_address: this.server.ip_address || '0.0.0.0', // ✅ Valor por defecto
        status: this.server.status
      }).subscribe({
        next: () => {
          alert("Servidor agregado exitosamente.");
          this.router.navigate(['/servers']);
        },
        error: (err) => {
          console.error("Error al agregar el servidor:", err);
        }
      });
    }
  }
}
