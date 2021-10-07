const Engineer = require('../library/Engineer')

test('Can you get GitHub User?', () =>{
    const testVal = 'bruh'
    const e = new Engineer('name', 21, 'email@email.com', testVal)

    expect(e.getGitHub()).toBe(testVal)
})