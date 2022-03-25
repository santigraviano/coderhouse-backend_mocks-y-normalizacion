(async () => {

  const socket = io()
  const pug = require('pug')

  const messageTemplateResponse = await fetch('/templates/message.pug')
  const messageTemplate = await messageTemplateResponse.text()

  const $messagesContainer = document.getElementById('messagesContainer')
  const $messagesForm = document.getElementById('messagesForm')

  const appendMessage = (message) => {
    $messageTag = document.createElement('div')
    $messageTag.innerHTML = pug.render(messageTemplate, message)
    $messagesContainer.appendChild($messageTag)
  }

  $messagesForm.addEventListener('submit', e => {
    e.preventDefault()

    const formData = new FormData($messagesForm)

    let data = {}
    for (let field of formData.entries()) {
      data[field[0]] = field[1]
    }

    socket.emit('new message', JSON.stringify(data))
  })

  socket.on('messages update', messages => {
    messages = JSON.parse(messages)

    const normalizedLength = JSON.stringify(messages.entities[messages.result]).length

    const author = new normalizr.schema.Entity('authors', {}, { idAttribute: 'email' })
    const message = new normalizr.schema.Entity('messages', { author }, { idAttribute: '_id' })
    const dataSchema = new normalizr.schema.Entity('data', { data: [message] })

    messages = normalizr.denormalize(messages.result, dataSchema, messages.entities)

    const denormalizedLength = JSON.stringify(messages.data).length
    const compressionPercentage = Math.round(normalizedLength * 100 / denormalizedLength)
    const $compressionTitle = document.getElementById('compressionTitle')
    $compressionTitle.innerHTML = `Compresión: ${compressionPercentage}%`

    $messagesContainer.innerHTML = ''
    messages.data.forEach(message => {
      appendMessage(message)
    })
  })

})()