import React, { useState, useEffect, useRef } from 'react';

const FlyingBird = () => {
  const canvasRef = useRef(null);
  const [x, setX] = useState(50);
  const [y, setY] = useState(200);
  const [frame, setFrame] = useState(0);
  const [controlPoints] = useState([
    { x: 50, y: 200 },
    { x: 400, y: 50 },
    { x: 750, y: 200 }
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawBird = (x, y) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 创建渐变对象
        const gradient = ctx.createLinearGradient(x - 20, y - 20, x + 20, y + 20);
        gradient.addColorStop(0, '#FFFF99'); // 淡黄色
        gradient.addColorStop(1, '#00FF00'); // 荧光绿色
        
        // 身体
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x + 15, y, 15, 0, Math.PI * 2);
        ctx.quadraticCurveTo(x + 0, y + 0, x + 0, y + 0);
        ctx.fill();
        // 头部
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x + 35, y - 6, 10, 120, Math.PI * 2);
        ctx.quadraticCurveTo(x + 0, y - 0, x + 0, y - 0);
        ctx.quadraticCurveTo(x + 0, y - 0, x + 0, y + 0);
        ctx.quadraticCurveTo(x + 0, y + 0, x + 0, y + 0);
        ctx.quadraticCurveTo(x + 0, y + 0, x + 0, y + 0);
        ctx.fill();
        
        // // 眼睛
        // ctx.fillStyle = 'white';
        // ctx.beginPath();
        // ctx.arc(x + 39, y - 10,  2, 0, Math.PI * 2);
        // ctx.fill();
        
        // ctx.fillStyle = 'black';
        // ctx.beginPath();
        // ctx.arc(x + 40, y - 10,  1, 0, Math.PI * 2);
        // ctx.fill();
        
        // // 嘴巴
        // ctx.strokeStyle = '#E65100'; // 橙色
        // ctx.lineWidth = 1;
        // ctx.beginPath();
        // ctx.moveTo(x + 8, y - 1);
        // // ctx.arc(x + 50, y - 0,  1, 0, Math.PI * 2);
        // ctx.lineTo(x + 12, y + 2);
        // ctx.stroke();
        
        // // 翅膀
        ctx.fillStyle = gradient;
        ctx.strokeStyle = 'black'; // 设置边框色为黑色
        ctx.lineWidth = 1; // 设置边框线宽度
        ctx.beginPath();
        ctx.moveTo(x + 17, y);

        // // 绘制爱心形状的右半部分
        ctx.quadraticCurveTo(x + 22, y - 6, x + 27, y - 4);
        ctx.quadraticCurveTo(x + 32, y - 2, x + 30, y + 6);
        ctx.quadraticCurveTo(x + 29, y + 9, x + 27, y + 11);
        ctx.quadraticCurveTo(x + 25, y + 13, x + 17, y + 16);

        // // 绘制倾斜的香油
        ctx.moveTo(x + 17, y);
        ctx.fill();
        ctx.stroke(); // 绘制边框

        
        // // 尾巴
        // ctx.beginPath();
        // ctx.moveTo(x + 20, y);
        // ctx.quadraticCurveTo(x - 47, y - 5, x - 12, y - 2);
        // ctx.quadraticCurveTo(x - 47, y + 5, x + 12, y);
        // ctx.fill();
      };
      
      
      
      
      

    const fly = () => {
      const t = frame / 100;
      const newX =
        (1 - t) ** 2 * controlPoints[0].x +
        2 * (1 - t) * t * controlPoints[1].x +
        t ** 2 * controlPoints[2].x;
      const newY =
        (1 - t) ** 2 * controlPoints[0].y +
        2 * (1 - t) * t * controlPoints[1].y +
        t ** 2 * controlPoints[2].y;
      setX(newX);
      setY(newY);
      drawBird(newX, newY);
    //   setFrame(frame + 1);
    };

    const animationId = requestAnimationFrame(fly);

    return () => cancelAnimationFrame(animationId);
  }, [frame, controlPoints]);

  return <canvas ref={canvasRef} width={800} height={400} />;
};

export default FlyingBird;
