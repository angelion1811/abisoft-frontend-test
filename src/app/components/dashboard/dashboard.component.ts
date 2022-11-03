import { TestService } from 'src/app/services/test.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

//import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private testService:TestService) { }

  ngOnInit(): void {
    this.getGeneralReport();
    this.getTestsByUsers();
    this.getTestsToItems();
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };

  public barChartOptionsGeneralReport: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
        max:10,
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };

  public barChartOptionsByUsers: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
        max:10,
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };

  public barChartOptionsToItems: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
        max:10,
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];

  public barChartDataGeneralReport: ChartData<'bar'> = {
    labels: ['Ping realizados'],
    datasets: [
      { data: [0], label: 'Afimartivas'},
      { data: [0], label: 'Negativas' },
    ]
  };

  public barChartDataByUsers: ChartData<'bar'> = {
    labels: ['Usuarios'],
    datasets: [
      { data: [0], label: 'Afimartivas'},
      { data: [0], label: 'Negativas' },
      { data: [0], label: 'Totales' },
    ]
  };

  public barChartDataToItems: ChartData<'bar'> = {
    labels: ['Equipos'],
    datasets: [
      { data: [0], label: 'Afimartivas'},
      { data: [0], label: 'Negativas' },
      { data: [0], label: 'Totales' },
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  getGeneralReport(){
    this.testService.getGeneralReport().subscribe(result=>{
      if(result.total){
        this.barChartOptionsGeneralReport = {
          responsive: true,
          scales: {
            x: {},
            y: {min: 0, max:result.total+1}
          },
          plugins: {
            legend: {
              display: true,
            },
          }
        };
        this.barChartDataGeneralReport.labels = [`Ping realizados ${result.total}`];
        this.barChartDataGeneralReport.datasets[0].data[0] = result.total_confirmed;
        this.barChartDataGeneralReport.datasets[1].data[0] = result.total_unconfirmed;
      }
    });
  }

  getTestsByUsers(){
    this.testService.getTestsByUsers().subscribe(result=>{
      if(result?.data?.length > 0){
        let maxY = 0
        this.barChartDataByUsers.datasets[0].data = [];
        this.barChartDataByUsers.datasets[1].data = [];
        this.barChartDataByUsers.datasets[2].data = [];
        this.barChartDataByUsers.labels = [];
        result.data.map((e:any)=>{
          e.total >= maxY ? maxY= e.total+1:null;
          this.barChartDataByUsers.datasets[0].data?.push(e?.total_confirmed??0);
          this.barChartDataByUsers.datasets[1].data?.push(e?.total_unconfirmed??0);
          this.barChartDataByUsers.datasets[2].data?.push(e?.total??0);
          this.barChartDataByUsers.labels?.push(e?.user?.name??'');
        });
        this.barChartOptionsByUsers = {
          responsive: true,
          scales: {
            x: {},
            y: {min: 0, max:maxY}
          },
          plugins: {
            legend: {
              display: true,
            },
          }
        };
      }
    });
  }

  getTestsToItems(){
    this.testService.getTestsToItems().subscribe(result=>{
      if(result?.data?.length > 0){
        let maxY = 0
        this.barChartDataToItems.datasets[0].data = [];
        this.barChartDataToItems.datasets[1].data = [];
        this.barChartDataToItems.datasets[2].data = [];
        this.barChartDataToItems.labels = [];
        result.data.map((e:any)=>{
          e.total >= maxY ? maxY= e.total+1:null;
          this.barChartDataToItems.datasets[0].data?.push(e?.total_confirmed??0);
          this.barChartDataToItems.datasets[1].data?.push(e?.total_unconfirmed??0);
          this.barChartDataToItems.datasets[2].data?.push(e?.total??0);
          this.barChartDataToItems.labels?.push(e?.item?.name??'');
        });
        this.barChartOptionsToItems = {
          responsive: true,
          scales: {
            x: {},
            y: {min: 0, max:maxY}
          },
          plugins: {
            legend: {
              display: true,
            },
          }
        };
      }
    });
  }
}
