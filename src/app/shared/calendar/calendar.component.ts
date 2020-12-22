import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import {PublicacionService} from '../../services/publicacion.service'
import { Publicacion } from 'src/app/models/publicaciones';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  selectedDate:Date;
  publicaciones:Publicacion[]=[];
  d= new Date();
  valor=false;
  mostrar=false;
  constructor(private post:PublicacionService) {
    
    //console.log(this.selectedDate+'es la fecha inicial')
  }

  ngOnInit(): void {
    let f1=new Date(this.d.getTime());
    f1.setHours(0,0,0);
    this.selectedDate=f1;
    let d=f1.getDate();
    let m=f1.getMonth()+1;
    let a=f1.getFullYear();
    let da:string=a+"-"+m+"-"+d;
    let start = new Date(da);
    //console.log(start,'fecha actual')
    this.post.selectEventsCalendar(start).subscribe(res=>{
      if(res){
        this.valor=true
        //console.log(res);
        if(res.length!=0){
          this.publicaciones=res;
          this.mostrar=true;
        }else{
          this.mostrar=false;
        }
        
      }
    })
  }
  imprimir(event:any){
    console.log(event)
  }
  dateClass() {
  return (date: Date): MatCalendarCellCssClasses => {
    if (date.getDate() === 1) {
      console.log(date.getDate())
      return 'special-date';
    } else {
      return;
    }
  };
  }
  onSelect(event){
  this.selectedDate= event;
  var i=0;
  this.post.selectEvents(this.selectedDate).subscribe(resp=>{
    console.log(resp);
    this.valor=true
    //console.log(res);
    if(resp.length!=0){
      this.publicaciones=resp;
      this.publicaciones=resp.filter((resp)=> resp.tipoPost=='Eventos');
      this.mostrar=true;
    }else{
      this.mostrar=false;
    }
    //console.log(resp);
  })
 //console.log(this.selectedDate)
  }
}
