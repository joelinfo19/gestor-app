import React from "react"
// import './Docentes.css'
//import Modal from '../../components/Modal'
import Swal from 'sweetalert2'
import { Button, Modal } from "react-bootstrap"
import Spinner from "../../components/Spinner"
import { Asistencia } from "../user/Asistencia"
import { Bar } from "react-chartjs-2"
import ReactECharts from 'echarts-for-react';



export default function Estadisticas() {


    var option;
    var option2;
    var option3;
    
    
{/* option3 = {
        title: {
            text: 'Distribution of Electricity',
            subtext: 'Fake Data'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            // prettier-ignore
            data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} W'
            },
            axisPointer: {
              snap: true
            }
          },
          visualMap: {
            show: false,
            dimension: 0,
            pieces: [
              {
                lte: 6,
                color: 'green'
              },
              {
                gt: 6,
                lte: 8,
                color: 'red'
              },
              {
                gt: 8,
                lte: 14,
                color: 'green'
              },
              {
                gt: 14,
                lte: 17,
                color: 'red'
              },
              {
                gt: 17,
                color: 'green'
              }
            ]
          },
          series: [
            {
              name: 'Electricity',
              type: 'line',
              smooth: true,
              // prettier-ignore
              data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
              markArea: {
                itemStyle: {
                  color: 'rgba(255, 173, 177, 0.4)'
                },
                data: [
                  [
                    {
                      name: 'Morning Peak',
                      xAxis: '07:30'
                    },
                    {
                      xAxis: '10:00'
                    }
                  ],
                  [
                    {
                      name: 'Evening Peak',
                      xAxis: '17:30'
                    },
                    {
                      xAxis: '21:15'
                    }
                  ]
                ]
              }
            }
          ]
      };*/}
    option2 = {
        xAxis: {
          type: 'category',
          data: ['020','012','010', '009','008','007','006','003','002','005','004','001','012','010', '009','008', '009','008','007','006','003']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [70, 85, 95, 90, 90, 100, 40,82,42,90,78,98, 85, 95, 90, 90, 100, 85, 95, 90, 90, 100],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.1)'
            }
          }
        ]
      };
    option = 
    {
        title:{
            
            left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: '%',
          top:'5%'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            top:'10%',
            radius: '75%',
            data: [
              { value: 15, name: 'DONCENTES CONTRATADOS' },
              { value: 25, name: 'DOCETES NOMBRADOS' }
              
              
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      option3 = 
    {
        title:{
            
            left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: '%',
          top:'5%'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            top:'10%',
            radius: '75%',
            data: [
              { value: 30, name: 'DOCENTES OCUPADOS' },
              { value: 10, name: 'DOCENTES LIBRES' }
              
              
              
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(20, 10, 3, 0.5)'
              }
            }
          }
        ]
      };
      
    // exact le dice a react router que se tiene que utilizar la ruta exactamente como esta escrita
    // <Route exact path="/" component={HomeScreen}/>
    return (
      
        <div className='container bg-white'>
          <h2> PORCENTAJE DE ASISTENCIA DOCENTE</h2>
            <div className="row border">
                {/* <img src="../images/mapa.jpeg" className="img-fluid my-3" alt="map"/>*/}
                 
                <hr/>
                <div className="d-flex justify-content-center " style={{width: '100%'}}>
                
                <div className="col-3">
                <ReactECharts option={option2}/>
                
                </div>
                {/*
               <div className="d-flex justify-content-center " style={{width: '100%'}}>
                <div className="col-3">
                <ReactECharts option={option3}/>
                </div>
                </div> */}
                </div>
                </div>

            {/* <div className="d-flex justify-content-center">

                <div className="card my-3" style={{width: '18rem'}}>
                    <div className="card-header">
                        Featured
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">An item</li>
                        <li className="list-group-item">A second item</li>
                        <li className="list-group-item">A third item</li>
                    </ul>
                </div>
    
            </div> */}

           
          <h2> NUMERO DE DOCENTES CONTRATADOS Y NOMBRADOS EN EL DEPARTAMENTO DE INFORMATICA</h2>
            <div className="row border">
                <div className="col-12  py-3">
                    <ReactECharts option={option}/>

                </div>
              </div>
              
            <div>
          <h2> NUMERO DE DOCENTES LIBRES Y CON CARGA ACADEMICA </h2>
            <div className="row border">
                <div className="col-12  py-3">
                    <ReactECharts option={option3}/>

                </div>
                </div>
                


               
                
                

                
                
                
               
            
            
               
            </div>
            
           

        </div>

    );
}
 