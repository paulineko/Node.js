const readline = require('readline')

const {
  getInput,
  printData,
  addData,
  changeData,
  deleteData,
} = require('./function')

main()

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  let input
  const menuInputs = ['1', '2', '3', '4', '5']

  do {
    console.log('1. Список товаров')
    console.log('2. Добавить товар')
    console.log('3. Изменить товар')
    console.log('4. Удалить товар')
    console.log('5. Выход')
    console.log('\n') 

    input = await getInput(rl)
    while (!menuInputs.includes(input)) {
      console.log('Такой команды нет, введите команду из списка!')
      input = await getInput(rl)
    }

    switch (input) {
      case '1': 
        printData()
        break

      case '2': 
        await addData(rl)
        break

      case '3': 
        await changeData(rl)
        break

      case '4': 
        await deleteData(rl)
        break
    }
  } while (input !== '5')

  rl.close()
}
