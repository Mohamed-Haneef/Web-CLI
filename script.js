

function isValidUrl(url) {
  try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch (error) {
      return false;
  }
}

// set var and return input value
function getInput() {
  command = commandInput.value;
  return command;
}

async function commandOutput() {
  // Assuming getInput() is a function that returns the command
  const command = getInput();

  try {
      const response = await fetch('jay.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              command: command
          })
      });

      if (!response.ok) {
          throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      return data.output;
  } catch (error) {
      console.error('Error:', error);
      return null;
  }
}

async function updateLiText() {
  try {
      // Call commandOutput() and wait for the result
      const output = await commandOutput();
      return output; // return the output
  } catch (error) {
      console.error('Error:', error);
      return error; // return the error
  }
}

// construct the html+text of the input command
function attachCommand() {
  // the command you entered
  var li = document.createElement('li');
  li.textContent = getInput();
  
  // the path
  var span = document.createElement('span');
  span.className = 'path';
  span.textContent = path;
  
  // attach path before command
  li.insertBefore(span,li.firstChild);
  
  // and attach to window
  result.appendChild(li);
}

// construct the html+text of the response
// function returnResponse() {
  // var li =document.createElement('li');
  
  // plain command vs starting with sudo
  // var answer = getInput();
  // li.textContent = commandOutput();
  // li.textContent = updateLiText();

  
  // and attach to window
  // result.appendChild(li);
// }
async function returnResponse() {
  try {
      // Get the output from updateLiText()
      const output = await updateLiText();
      // Create a new li element
      var li = document.createElement('li');
      // Set the text content of the li element to the output
      if(output == null){
        li.textContent = 'Enter a valid command!!';
      }else{
        li.textContent = output;
      }
      // Attach the li element to the result
      result.appendChild(li);
  } catch (error) {
      console.error('Error:', error);
  }
}


// set input to last command on up key (see event listener below)
function repeatInput() {
  commandInput.value = command;
}

// scroll to bottom...
function scrollToBottom() {
  result.scrollTop = result.scrollHeight;
}

// run all functions on enter (see event listener below)
function doTheThing() {
  if(getInput().trim() !== '') { // trim whitespace and check if empty
    attachCommand();
    returnResponse();
    scrollToBottom();
  }
  
  commandInput.value = ''; // clear input value 
}


const currentUrl = window.location.href;
if(isValidUrl(currentUrl)){
  // var hoisting transports this to the top
  var commandInput = document.getElementById('command-input'),
  result = document.querySelector('.result'),
  command = '',
  path = 'sna@server:-$ ';

  // whenever you press a key
  commandInput.addEventListener('keydown',function(e){
  if(e.keyCode === 13) doTheThing(); // enter key
  if(e.keyCode === 38) repeatInput(); // up key
});
}
