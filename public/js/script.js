'use strict';

const checkboxes = document.querySelectorAll('.text input[type=checkbox]');
const sendRequest = document.querySelector('#send-request');

checkboxes.forEach((checkbox, i) => {
  checkbox.addEventListener('change', (e) => {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    const inputText = document.querySelector('#param-value');
    e.target.checked = true;
    inputText.value = 'text=' + e.target.value;
  });
});

sendRequest.addEventListener('click', (e) => {
  const acceptType = document.querySelector('#accept-type');
  const paramValue = document.querySelector('#param-value');
  if (paramValue.value) {
    if (acceptType.value === 'application/json') {
      fetch(`/query?${paramValue.value}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const jsonWrapper = document.querySelector('#json-wrapper');
          jsonWrapper.firstChild.remove();
          jsonWrapper.style.display = 'block';
          renderjson.set_show_to_level(3);
          document.querySelector('#json-wrapper').appendChild(renderjson(data));
        })
        .catch((err) => console.log(err));
    } else if (acceptType.value === 'text/html') {
      window.open(`/query?${paramValue.value}`);
    } else {
      // Do nothing
    }
  }
});
