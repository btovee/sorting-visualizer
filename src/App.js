import './App.css';
import SortingVisualizer from "./sorting-visualizer/sorting-visualizer";
import Container from '@material-ui/core/Container';

function App() {
  return (
      <Container fixed>
          <div className="App">
            <SortingVisualizer/>
          </div>
      </Container>
  );
}

export default App;
