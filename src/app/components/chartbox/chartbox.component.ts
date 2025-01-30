// import { Component, OnInit } from '@angular/core';
// import { Chart, LinearScale, CategoryScale,LineController, Title, Tooltip, Legend ,BarController } from 'chart.js';

// // Register necessary components for Chart.js
// Chart.register(LinearScale, CategoryScale, Title, Tooltip,  Legend,LineController,BarController);

// @Component({
//   selector: 'app-chartbox',
//   standalone: false,
//   templateUrl: './chartbox.component.html',
//   styleUrls: ['./chartbox.component.css']
// })
// export class ChartboxComponent implements OnInit {
//   constructor() { }
//   labels= ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
//     values= [12, 19, 3, 5, 2, 3]
//   ngOnInit(): void {



//       new Chart('myChart', {
//         type: 'bar',
//         data: {
//           labels: this.labels,
//           datasets: [{
//             label: 'Sample Data',
//             data: this.values,
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1
//           }]
//         },
//         options: {
//           responsive: true,
//           scales: {
//             y: {
//               beginAtZero: true
//             }
//           }
//         }
//       });
//     }
//   }

