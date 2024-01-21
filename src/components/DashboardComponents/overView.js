import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { getAllReviewsSelected } from '../actions/review';
Chart.register(
 CategoryScale,
 LinearScale,
 BarElement,
 PointElement,
 LineElement,
 ArcElement,
 Title,
 Tooltip,
 Legend
);

function OverView() {
    const dispatch = useDispatch();
   
    const reviews = useSelector((state) => state.reviews);
 const dataValues = [1952, 1019, 213, 600, 1552, 1019, 213, 600, 1552, 1019, 213, 600];
 const total = dataValues.reduce((a, b) => a + b, 0);
 const dataPercentages = dataValues.map(value => (value / total) * 1000);

 const data = {
    labels: ["Jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: dataValues,
        backgroundColor: ["#2E3480", "#2E3480", "#2E3480", "#2E3480", "#2E3480", "#2E3480", "#2E3480", "#2E3480", "#2E3480", "#2E3480", "#2E3480", "#2E3480"],
        borderColor: ["#2E3480", "#2E3480", "#2E3480", "#2E3480", "#2E3480", "#2E3480", "#2E3480", "#2E3480", "#2E3480", "#2E3480", "#2E3480", "#2E3480"],
        borderWidth: 0.5,
      },
      {
        label: "Line Revenue",
        data: dataPercentages,
        fill: false,
        borderColor: '#2E3480',
        tension: 0.1
      }
    ],
 };

 const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value;
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: '',
      },
      legend: {
        labels: {
          fontSize: 15,
        },
      },
    },
 };

 const pieData = {
    labels: ["TELL Conf","Amman Conf","Cario Conf"],
    datasets: [
      {
        data: [500,1300,200],
        backgroundColor: ["#db4c5a","#2E3480","#ae8a9f"],
        hoverBackgroundColor: ["#c69a39"]
      }
    ]
 };

 const pieOptions = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Registered Conference',
      },
      legend: {
        labels: {
          fontSize: 15,
        },
      },
    },
 };
 useEffect(() => {
    dispatch(getAllReviewsSelected());
  }, [dispatch]);
 return (
    <div className='ov-component'>
      <div className='ov-third-graph'>
        <div style={{display: 'flex', justifyContent: 'space-around',marginBottom:'80px',height:"400px"}}>
          <div style ={{width:'47%'}}>
            <Bar data={data} options={options} height={200}/>
          </div>
          <div style ={{width:'47%'}}>
            <Line data={data} options={options} height={200} />
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-around',marginBottom:'80px'}}>
        <div  style ={{width:'47%'}}>
          <Pie data={pieData} options={pieOptions} height={200} />
        </div>
        <div  style ={{width:'47%'}}>
        <table className="the-users-table">
        <caption style={{captionSide:"top"}}>Some Selected Reviews</caption>
          <thead>
            <tr>
              <th></th>
              
              <th>Provider</th>
              <th>Description</th>
             
            </tr>
          </thead>
          <tbody>
            {reviews?.slice(0,2).map((review, index) => (
              <tr className='reviews-row' key={index}>
                <td>{index+1}</td>
                
                <td>{review.nameOftestemoniated}</td>
                <td>{review.description}</td>
                
                 </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
 );
}

export default OverView;
