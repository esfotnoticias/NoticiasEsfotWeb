import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { Usuario } from 'src/app/models/usuario.model';
import { map } from 'rxjs/internal/operators/map';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {
@Input()user:Usuario;
public usuario=new Usuario();
step = -1;

  constructor( private auth:AuthService) {

   
  }



  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit(): void {

  }


obtenerUsuario(id:string){
  
  this.auth.getUser(id).subscribe(rep=>{
    this.usuario=rep;
  }
  );
}


}
