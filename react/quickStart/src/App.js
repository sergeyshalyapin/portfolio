import { useState } from 'react';

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

const styledObject = {
  width: user.imageSize,
  height: user.imageSize
}

const isLoggedIn = true;

const products = [
  { title: "Cabbage", isFruit: false, id: 1},
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

function IndependentProfileButton() {
  const [counter, setCounter] = useState(0);
  const buttonName = "View profile";
  const handleClick = () => {
    setCounter(counter + 1);
  }
  return (
    <button onClick={handleClick} className="btn">
      {buttonName} is clicked {counter} times
    </button>
  );
}

function DependentProfileButton({
  counter,
  handleClick,
}) {
  const buttonName = "View profile";
  return (
    <button onClick={handleClick} className="btn">
      {buttonName} is clicked {counter} times
    </button>
  );
}

export default function App() {
  const listItems = products.map(product => (
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  ));

  const [dependentButtonCounter, setdependentButtonCounter] = useState(0);
  const handleClickOnDependentButton = () => {
    setdependentButtonCounter(dependentButtonCounter + 1);
  }

  const jsxObj = (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={styledObject}
      />
      <div>
        <p>Independent Buttons</p>
        {isLoggedIn && <IndependentProfileButton />}
        <br/>
        <IndependentProfileButton />
      </div>
      <div>
        <p>Dependent Buttons</p>
        {isLoggedIn && <DependentProfileButton
          counter={dependentButtonCounter}
          handleClick={handleClickOnDependentButton}
        />}
        <br/>
        <DependentProfileButton
          counter={dependentButtonCounter}
          handleClick={handleClickOnDependentButton}
        />
      </div>
      <ul>{listItems}</ul>
    </>
  );

  console.log(jsxObj);
  return jsxObj;
}
