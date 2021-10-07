const Intern = require('../library/Intern')

test('Can you get interns School?', () =>{
    const testVal = 'bruh'
    const e = new Intern('name', 21, 'email@email.com', testVal)

    expect(e.getSchool()).toBe(testVal)
})