const Employee = require('../library/Employee')

test('can we get a name via getName?', () => {
    const testVal = 'john'
    const e = new Employee(testVal)
    expect(e.name).toBe(testVal)
})

test('can we get an email via getEmail?', () => {
    const testVal = 'helloWorld@Gmail.com'
    const e = new Employee('john' , testVal)
    expect(e.getEmail()).toBe(testVal)
})