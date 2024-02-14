export default function AddPlayerForm(props) {
  return (
    <form>
      <label htmlFor="firstNameInput">
        First Name: 
      </label>
      <input
        id="firstNameInput"
        type="text"
        name="firstName"
        onChange={props.handleInputChange}
        value={props.firstName}
      />
      <label htmlFor="lastNameInput">
        Last Name: 
      </label>
      <input
        id="lastNameInput"
        type="text"
        name="lastName"
        onChange={props.handleInputChange}
        value={props.lastName}
      />
      <label htmlFor="numberInput">
        Number: 
      </label>
      <input
        id="numberInput"
        type="number"
        name="number"
        min="0"
        max="99"
        onChange={props.handleInputChange}
        value={props.number}
      />
      <label htmlFor="positionSelect">
        Position: 
      </label>
      <select
        onChange={props.handleInputChange}
        value={props.position}
        id="positionSelect"
        name="position"
      >
        <option value="Guard">Guard</option>
        <option value="Forward">Forward</option>
        <option value="Center">Center</option>
      </select>
      <label htmlFor="feetInput">
        Height:  
      </label>
      <input
        id="feetInput"
        type="number"
        min="3"
        max="7"
        name="feet"
        onChange={props.handleInputChange}
        value={props.height.feet}
      />
      <input
        id="inchesInput"
        type="number"
        min="0"
        max="11"
        name="inches"
        onChange={props.handleInputChange}
        value={props.height.inches}
      />
      <label htmlFor="weightInput">
        Weight: 
      </label>
      <input
        id="weightInput"
        type="number"
        min="0"
        name="weight"
        onChange={props.handleInputChange}
        value={props.weight}
      />
      <button type="submit" id="submitNewPlayerBtn">Add Player</button>
    </form>
  );
}