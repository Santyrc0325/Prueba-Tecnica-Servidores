import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-servers',
  standalone: false,
  templateUrl: './servers.component.html',
})
export class ServersComponent implements OnInit {
  servers: any[] = [];

  constructor(private serverService: ServerService, private router: Router) {}

  ngOnInit() {
    this.loadServers();
  }

  loadServers() {
    this.serverService.getServers().subscribe((data: any) => {
      this.servers = data;
    });
  }

  viewDetails(id: number) {
    this.router.navigate(['/server', id]);
  }

  editServer(id: number) {
    this.router.navigate(['/edit-server', id]);
  }

  deleteServer(id: number) {
    this.serverService.deleteServer(id).subscribe(() => {
      this.loadServers();
    });
  }
}
