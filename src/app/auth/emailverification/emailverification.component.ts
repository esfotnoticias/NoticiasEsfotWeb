import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.css']
})
export class EmailverificationComponent implements OnInit {
public user$:Observable<any>=this.auth.AFauth.user;
error1=false;
id:string;
  constructor(private auth:AuthService) { 
      this.user$.subscribe(res=>{
        if(res){
          this.id=res.id
        }
      })
  }

  ngOnInit(): void {
  }
  Reenviar():void{
    try{
      this.auth.sendVerificationEmail();
    }catch(err){
      this.error1=true;
      setTimeout(() => {
        this.error1=false;
      }, 3000);
     
    }

  }

  regresar(){
    
      this.auth.actualizarTokenUser(this.id,"");
      this.auth.logout();
    
  }
  
}
