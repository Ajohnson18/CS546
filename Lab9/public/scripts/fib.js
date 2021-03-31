let form = document.getElementById('fibForm');
let input = document.getElementById('fibInput');
let fibOl = document.getElementById('results');

function fibonacci(num) 
{ 
    var num1=0; 
    var num2=1; 
    var sum; 
    var i=0; 
    for (i = 0; i < num-1; i++)  
    { 
        sum=num1+num2; 
        num1=num2; 
        num2=sum; 
    } 
    return num2; 
} 

function isPrime(num) {
  for(var i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num > 1;
}

if (form) {
    form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value.trim()) {
    //   input.classList.remove('inputClass');
    //   errorDiv.hidden = true;
    //   frmLabel.classList.remove('error');
      let li = document.createElement('li');

      if(isPrime(fibonacci(input.value))) { li.innerHTML = '<p class="is-prime">The Fibonacci of ' + input.value + ' is ' + fibonacci(input.value) + '</p>'; }
      else {li.innerHTML = '<p class="not-prime">The Fibonacci of ' + input.value + ' is ' + fibonacci(input.value) + '</p>';}
      fibOl.appendChild(li);
      form.reset();
      input.focus();
    } else {
      input.value = '';
    //   errorDiv.hidden = false;
    //   errorDiv.innerHTML = 'You must enter a value';
    //   frmLabel.className = 'error';
    input.focus();
    //   textInput.className = 'inputClass';
    }
  });
}