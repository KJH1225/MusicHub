import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';

const Dash = () => {
  const [userData, setUserData] = useState([100, 150, 200, 180, 220, 170, 130]);
  const [categoryData, setCategoryData] = useState([50, 70, 90, 60, 80]);
  const [totalVisitors, setTotalVisitors] = useState(15000);
  const [totalRevenue, setTotalRevenue] = useState(75000);
  const [totalSales, setTotalSales] = useState(5000);
  const [notifications, setNotifications] = useState([
    '새 주문이 도착했습니다.',
    '서버에 문제가 발생했습니다.',
    '최근 방문자 수가 증가했습니다.',
  ]);

  useEffect(() => {
    const userC = document.getElementById('userChart').getContext('2d');
    new Chart(userC, {
      type: 'bar',
      data: {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [
          {
            label: '하루 이용자',
            data: userData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
          },
        },
      },
    });

    const categoryC = document.getElementById('categoryChart').getContext('2d');
    new Chart(categoryC, {
      type: 'doughnut',
      data: {
        labels: ['카테고리 1', '카테고리 2', '카테고리 3', '카테고리 4', '카테고리 5'],
        datasets: [
          {
            data: categoryData,
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 205, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
            borderWidth: 1,
          },
        ],
      },
    });

    const visitorsC = document.getElementById('visitorsChart').getContext('2d');
    new Chart(visitorsC, {
      type: 'line',
      data: {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [
          {
            label: '누적 방문자 수',
            data: [500, 700, 850, 750, 900, 950, 1000],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
          },
        },
      },
    });

    const revenueC = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueC, {
      type: 'polarArea',
      data: {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [
          {
            label: '수익',
            data: [200, 300, 280, 320, 270, 350, 400],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
          },
        },
      },
    });

    const salesC = document.getElementById('salesChart').getContext('2d');
    new Chart(salesC, {
      type: 'bar',
      data: {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [
          {
            label: '상품 판매량',
            data: [30, 40, 35, 45, 38, 50, 55],
            backgroundColor: 'rgba(255, 205, 86, 0.2)',
            borderColor: 'rgba(255, 205, 86, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
          },
        },
      },
    });
  }, []);

  return (
    <div>
      <h1>관리자 대시보드</h1>
      <div>
        <h2>하루 이용자</h2>
        <div style={{ width: '300px', height: '200px' }}>
          <canvas id="userChart" style={{ width: '100%', height: '100%' }}></canvas>
        </div>
      </div>
      <div>
        <h2>인기 카테고리</h2>
        <div style={{ width: '300px', height: '200px' }}>
          <canvas id="categoryChart" style={{ width: '100%', height: '100%' }}></canvas>
        </div>
      </div>
      <div>
        <h2>누적 방문자 수</h2>
        <div style={{ width: '300px', height: '200px' }}>
          <canvas id="visitorsChart" style={{ width: '100%', height: '100%' }}></canvas>
        </div>
      </div>
      <div>
        <h2>수익</h2>
        <div style={{ width: '300px', height: '200px' }}>
          <canvas id="revenueChart" style={{ width: '100%', height: '100%' }}></canvas>
        </div>
      </div>
      <div>
        <h2>상품 판매량</h2>
        <div style={{ width: '300px', height: '200px' }}>
          <canvas id="salesChart" style={{ width: '100%', height: '100%' }}></canvas>
        </div>
      </div>
      <div>
        <h2>알림 및 경고</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dash;

//산포scatter, 버블bubble, 폴라polarArea, 레이더radar, 도넛doughnut, 선line