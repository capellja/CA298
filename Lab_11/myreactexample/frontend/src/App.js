import logo from './logo.svg';
import './App.css';
import HeadingComponent from './components/heading';
import MyButton from './components/button';
import Counter from './components/counter';
import CatFacts from './components/catfacts';
import BookList from './components/booklist';
import SingleBook from './components/singlebook';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <HeadingComponent />
      <MyButton />
      <Counter />
      <CatFacts />
      <BookList />
      <SingleBook id="1" />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
