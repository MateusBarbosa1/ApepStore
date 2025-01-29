const url = 'http://localhost:3000';

test('GET / should return status 200', async () => {
    const response = await fetch(url + '/');

    expect(response.status).toBe(200);
});