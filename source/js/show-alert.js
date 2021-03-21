export const showGetFail = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
};

export const showSendMessage = (state) => {
  const sendMessage = document.querySelector(`#${state}`).content.cloneNode(true).querySelector(`.${state}`);
  const tryAgainButton = sendMessage.querySelector('.error__button');

  const onDocumentKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      sendMessage.remove();
      document.removeEventListener('keydown', onDocumentKeyDown);
    }
  };

  document.addEventListener('keydown', onDocumentKeyDown);

  if (tryAgainButton) {
    tryAgainButton.addEventListener('click', () => {
      sendMessage.remove();
    });
  }

  sendMessage.addEventListener('click', () => {
    sendMessage.remove();
  });

  document.body.append(sendMessage);
};
