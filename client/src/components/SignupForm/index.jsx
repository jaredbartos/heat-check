export default function SignupForm(props) {
  return (
    <form onSubmit={props.handleFormSubmit}>
      <label htmlFor="newUsernameInput">
        Username: 
      </label>
      <input
        id="newUsernameInput"
        name="username"
        type="text"
        value={props.username}
        onChange={props.handleInputChange}
      />
      <label htmlFor="newEmailInput">
        Email: 
      </label>
      <input
        id="newEmailInput"
        name="email"
        type="email"
        value={props.email}
        onChange={props.handleInputChange}
      />
      <label htmlFor="newPasswordInput">
        Password: 
      </label>
      <input
        id="newPasswordInput"
        type="password"
        name="password"
        value={props.password}
        onChange={props.handleInputChange}
      />
      <button type="submit" id="signUpBtn">Sign Up</button>
    </form>
  )
}