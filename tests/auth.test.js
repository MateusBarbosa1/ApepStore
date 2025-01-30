const link = "http://localhost:3000";

test("GET /login should return status 200", async () => {
  const response = await fetch(link + "/login");
  expect(response.status).toBe(200);
});
test("GET /register should return status 200", async () => {
  const response = await fetch(link + "/register");
  expect(response.status).toBe(200);
});
