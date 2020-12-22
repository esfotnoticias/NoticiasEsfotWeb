import { Component, OnInit } from '@angular/core';
import { Chart} from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-userestadistica',
  templateUrl: './userestadistica.component.html',
  styleUrls: ['./userestadistica.component.css']
})
export class UserestadisticaComponent implements OnInit {
  chart=[];
  grafi2=[];
  valor=[];
  grafico1=false;
  descargar=false;
  valor1=false;
  usuario:Usuario=new Usuario();
  constructor(private auth:AuthService,
    private activatedRoute:ActivatedRoute,) {
    this.activatedRoute.params.subscribe(params=>{   
      if(params['id']!=undefined){
        this.auth.getUser(params['id']).subscribe(
           resp=>{
            this.usuario=resp;
            if(resp!=undefined){
              this.valor1=true;
            }
          }
        )
      }
    });
   }


  ngOnInit(): void {
    this.auth.usuariosgrafico1().subscribe(resp=>{
      if(resp){
       this.chart= new Chart('canvas',{
         type: 'pie',
          
         data: {
           labels: ["Nuevos", "Activos"],
           datasets: [
             {
               label: "Usuarios",
               backgroundColor: ["#3e95cd", "#8e5ea2"],
               data: resp
             }
           ]
         },
         options: {
          
           title: {
             display: true,
             text: 'Usuarios registrados'
           }    
         }    
       })
      }
   });

   this.auth.usuariosGrafico2().subscribe(res=>{
     if(res){
       this.grafi2= new Chart('ctx',{
         type: 'bar',
          
         data: {
           labels: ["Administrador", "Secretaria","AEESFOT","Docente","Estudiante","Invitado"],
           datasets: [
             {
               label: "Usuarios",
               backgroundColor: ["#3e95cd", "#33FFD8","#3392FF","#CE33FF","#FFEC33","#FF6433"],
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
             text: 'Tipos de usuarios'
           }    
         }    
       })
       this.descargar=true;
      }
   })
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
