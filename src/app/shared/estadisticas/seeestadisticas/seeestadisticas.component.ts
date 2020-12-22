import { Component, OnInit } from '@angular/core';
import { Chart} from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-seeestadisticas',
  templateUrl: './seeestadisticas.component.html',
  styleUrls: ['./seeestadisticas.component.css']
})
export class SeeestadisticasComponent implements OnInit {
  chart=[];
  grafi2=[];
  valor=[];
  grafico1=false;
  constructor(private auth:AuthService) { 
    

  }

  ngOnInit(): void {



  }
  probar(){
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
       }
    })
  }
}
