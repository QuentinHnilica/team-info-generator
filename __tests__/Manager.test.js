const Manager = require('../library/Manager')

test('Can you get Managers Office Number?', () =>{
    const testVal = '401'
    const e = new Manager('name', 21, 'email@email.com', testVal)

    expect(e.getOfficeNum()).toBe(testVal)
})