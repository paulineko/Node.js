const fs = require('fs')
const path = require('path')

fileName = 'data.json'

function readFile() {
  if (fs.existsSync(fileName)) {
    content = JSON.parse(fs.readFileSync(fileName))
  } else {
    fs.mkdirSync(dirPath, { recursive: true })
    fs.writeFileSync(fileName, '[]')
  }
  return content
}

function getInput(rl) {
  return new Promise((resolve) => {
    rl.question('> ', (input) => resolve(input))
  })
}

function printData() {
  const data = readFile()
  data.forEach((eachData) => console.log(`${eachData.ID}. ${eachData.name}`))
  console.log('\n')
}

async function addData(rl) {
  let data = readFile()
  let input
  let newData = {}

  console.log('Введите ID:')
  input = await getInput(rl)
  newData.ID = input

  console.log('Введите название товара:')
  input = await getInput(rl)
  newData.name = input

  data.push(newData)

  let jsonContent = JSON.stringify(data, null, 2)
  fs.writeFileSync(fileName, jsonContent)

  console.log('Список товаров обнавлен', data, '\n')
}

async function changeData(rl) {
  let data = readFile()
  let input
  console.log('\n', 'Список товаров: ', '\n')
  data.forEach((eachData) => console.log(`${eachData.ID}. ${eachData.name}`))
  console.log('\n')
  console.log('Под каким id вы хотите изменить товар?')
  input = await getInput(rl)
  const findID = data.findIndex((eachData) => eachData.ID == input)

  if (findID === -1) {
    console.log('Такого товара нет', '\n')
    return
  } else {
    console.log('Введите новое название товара:')
  }
  input = await getInput(rl)
  data[findID].name = input

  let jsonContent = JSON.stringify(data, null, 2)
  fs.writeFileSync(fileName, jsonContent)

  console.log('Список товаров обнавлен', data, '\n')
}

async function deleteData(rl) {
  let data = readFile()
  let input
  console.log('\n', 'Список товаров: ', '\n')
  data.forEach((eachData) => console.log(`${eachData.ID}. ${eachData.name}`))
  console.log('\n')

   console.log('Под каким ID вы хотите удалить товар?')
   input = await getInput(rl)
   const findID = data.findIndex((eachData) => eachData.ID == input) 

   const idInputs = ['1', '2', '3', '4'] 

  while (!idInputs.includes(input)) {
    console.log('Под этим id товара нет, введи занаво')
    input = await getInput(rl)
  }  

  data.splice(findID, 1)

  let jsonContent = JSON.stringify(data, null, 2)
  fs.writeFileSync(fileName, jsonContent)
  console.log('Товар удален', data, '\n')
}

module.exports = {
  getInput,
  printData,
  addData,
  changeData,
  deleteData,
}