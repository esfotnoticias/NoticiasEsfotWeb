import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CargarCabeceraService } from 'src/app/services/cargar-cabecera.service';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { MyErrorStateMatcher, errorMessages } from 'src/app/models/MyErrorStateMatcher';
import { ValidadoresService } from 'src/app/services/validadores.service';
import { Chart} from 'chart.js';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-eventestadistica',
  templateUrl: './eventestadistica.component.html',
  styleUrls: ['./eventestadistica.component.css']
})
export class EventestadisticaComponent implements OnInit {
  usuario:Usuario=new Usuario();
  valor=false;
  errors = errorMessages;
  firstFormGroup: FormGroup;
  chart=[];
  chart2=[];
  descargar=false;
  matcher = new MyErrorStateMatcher();
  constructor(private auth:AuthService,
    private activatedRoute:ActivatedRoute,
    private validaciones: ValidadoresService,
    private publicaciones:CargarCabeceraService,
    private fb: FormBuilder) { 
    this.activatedRoute.params.subscribe(params=>{   
      if(params['id']!=undefined){
        this.auth.getUser(params['id']).subscribe(
           resp=>{
            this.usuario=resp;
            if(resp!=undefined){
              this.valor=true;
            }
          }
        )
      }
  })
  this.crearFormulario();
  }

  ngOnInit(): void {
  }
  crearFormulario(){
    this.firstFormGroup = this.fb.group({
     start: ['', Validators.required],
     end: [''],    
   },
   {
     validators: this.validaciones.fechaMayor('start', 'end'),
    
   });
   this.matcher = new MyErrorStateMatcher()
  }
  onUpload(forma:FormGroup){
  
    if(this.firstFormGroup.invalid){
     
      return Object.values(this.firstFormGroup.controls).forEach(control=>{
        if (control instanceof FormGroup){
          Object.values(control.controls).forEach(control=>control.markAsTouched()) ;
          }else{
            control.markAsTouched();
          }
        });
    }else{
    
      this.publicaciones.EventosEstdisticasGlobal(this.usuario.uid,this.firstFormGroup.controls[('start')].value,this.firstFormGroup.controls[('end')].value).subscribe(resp=>{
       
        if(resp){
          this.chart= new Chart('canvas',{
            type: 'bar',
             
            data: {
              labels: ["Cantidad"],
              datasets: [
                {
                  label: "Eventos Globales",
                  backgroundColor: ["#FF6433"],
                  data: resp
                }
              ]
            },
            options: {
              scales:{
                yAxes:[{
                  ticks:{
                    beginAtZero:true
                  }
              }]
            },
              legend: { display: false },
              title: {
                display: true,
                text: 'Cantidad de Eventos que subiste a nivel Global'
              }    
            }    
          })
         }
      });
      this.publicaciones.EventosEstdisticasAprobRech(this.usuario.uid,this.firstFormGroup.controls[('start')].value,this.firstFormGroup.controls[('end')].value).subscribe(res=>{
        if(res){
          this.chart2= new Chart('ctx',{
            type: 'bar',
             
            data: {
              labels: ["Cantidad"],
              datasets: [
                {
                  label: "Eventos aprobados",
                  backgroundColor: ["#FFEC33"],
                  data: res
                }
              ]
            },
            options: {
              scales:{
                yAxes:[{
                  ticks:{
                    beginAtZero:true
                  }
              }]
            },
              legend: { display: false },
              title: {
                display: true,
                text: 'Cantidad de Eventos que aprobaste a nivel Global'
              }    
            }    
          })
         }
         this.descargar=true;
      })
    }
  }
  download(){
 
    var element=document.getElementById('imprimir');
    html2canvas(element).then((canvas)=>{
      
      var doc = new jspdf.jsPDF();
      var imgData= canvas.toDataURL('image/png');
      var imgHeight=canvas.height*208/canvas.width
      doc.addImage(imgData,0,0,208,imgHeight);
      doc.save("image.pdf");
    });
  }
}
