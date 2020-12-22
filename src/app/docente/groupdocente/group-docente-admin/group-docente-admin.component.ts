import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { GruposService } from 'src/app/services/grupos.service';
@Component({
  selector: 'app-group-docente-admin',
  templateUrl: './group-docente-admin.component.html',
  styleUrls: ['./group-docente-admin.component.css']
})
export class GroupDocenteAdminComponent implements OnInit {
  
  constructor() {
  
}
  ngOnInit(): void {
  }
    
}
  