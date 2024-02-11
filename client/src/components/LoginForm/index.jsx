export default function LoginForm(props) {
  return (
    <form onSubmit={props.handleFormSubmit}>
      <label htmlFor="email">
        Email: 
      </label>
      <input
        id="emailInput"
        name="email"
        type="email"
        value={props.email}
        onChange={props.handleInputChange}
      />
      <label htmlFor="password">
        Password: 
      </label>
      <input
        id="passwordInput"
        type="password"
        name="password"
        value={props.password}
        onChange={props.handleInputChange}
      />
      <button type="submit" id="loginBtn">Submit</button>
    </form>
  )
}