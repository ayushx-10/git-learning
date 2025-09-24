document.body.addEventListener('click', function (event) {
    const circle = document.createElement('div');
    circle.className = 'circle';
    
    const x = event.clientX;
    const y = event.clientY;
    circle.style.left = `${x - 25}px`
    circle.style.top = `${y - 25}px`   
  
   
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3F033', '#8E44AD'];
    circle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  

    const messages = ['Hi', 'Hello', 'Welcome', 'Hey there', 'Hola'];
    circle.textContent = messages[Math.floor(Math.random() * messages.length)];
  
    document.body.appendChild(circle);
  

    setTimeout(() => {
      circle.remove();
    }, 5000);
  });



// document.body.addEventListener("click", (event)=>{
  
//   const circle = document.createElement('div');
//   circle.className = 'circle';
//   circle.textContent="Hi";
  
//   const x = event.clientX;
//   const y = event.clientY;

//   circle.style.left = `${x-25}px`
//   circle.style.top= `${y-25}px`


//   circle.style.backgroundColor = color[Math.floor(Math.random()*color.length)];
//   document.body.appendChild(circle);



//   setTimeout(()=>{
//     circle.remove();
//   } ,5000)
// })




// document.body.addEventListener("click",(event)=>{

//     const circle = document.createElement('div');
//     circle.className = 'circle';

//     circle.textContent="Hi";

//     const x = event.clientX;
//     const y = event.clientY;

//     circle.style.left = `${x-25}px`
//     // string ko ham aise bhi likh sakte hai
//     // last click ke baad -25 ghasakna hai 
//     circle.style.top= `${y-25}px`




//     const color = ["red","green","yellow","orange","blue","purple"]
//      circle.style.backgroundColor =color[Math.floor(Math.random()*color.length)];
//     document.body.appendChild(circle);


//     setTimeout(()=>{
//     circle.remove();
//     } ,5000)

     

// })