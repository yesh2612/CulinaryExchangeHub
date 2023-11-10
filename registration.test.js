const { validateRegistrationForm, registerUser } = require('./registration');

describe('Registration Form Validation', () => {
  test('Validating empty fields returns false', () => {
    document.body.innerHTML = `
      <form name="myform">
        <input id="username" value="">
        <input id="password" value="">
        <input id="confirm-password" value="">
      </form>
    `;
    expect(validateRegistrationForm()).toBe(false);
  });

  test('Validating mismatched passwords returns false', () => {
    document.body.innerHTML = `
      <form name="myform">
        <input id="username" value="John">
        <input id="password" value="password1">
        <input id="confirm-password" value="password2">
        <div id="login-error-msg"></div>
      </form>
    `;
    expect(validateRegistrationForm()).toBe(false);
    expect(document.getElementById("login-error-msg").textContent).toBe("Password Mismatch");
  });

  test('Validating valid form returns true', () => {
    document.body.innerHTML = `
      <form name="myform">
        <input id="username" value="John">
        <input id="password" value="password">
        <input id="confirm-password" value="password">
      </form>
    `;
    expect(validateRegistrationForm()).toBe(true);
  });
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe('Register User', () => {
  test('Registers user successfully', async () => {
    document.body.innerHTML = `
      <form name="myform">
        <input id="username" value="John">
        <input id="password" value="password">
      </form>
    `;
    const response = await registerUser();
    expect(response.success).toBe(true);
  });
});
