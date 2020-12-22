import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-group-docente-crud',
  templateUrl: './group-docente-crud.component.html',
  styleUrls: ['./group-docente-crud.component.css']
})
export class GroupDocenteCrudComponent implements OnInit {
  
  constructor(private auth:AuthService,
    private activatedRoute:ActivatedRoute) { }


  ngOnInit(): void {
 
  }
}
