import './App.css';
import DegreeList from './components/allDegree';
import { Routes, Route } from "react-router-dom"
import Home from './components/home';
import NavBar from './components/navBar';
import CohortList from './components/allCohort';
import ModuleList from './components/allModules';
import SingleDegree from './components/singleDegree';
import SingleCohort from './components/singleCohort';
import SingleModule from './components/singleModule';
import ModuletoCohort from './components/modulestocohort';
import SingleStudent from './components/singleStudent';
import FormDegree from './components/formDegree';
import FormCohort from './components/formCohort';
import FormModule from './components/formModule';
import FormStudent from './components/formStudent';
import AddGrade from './components/addGrade';
import './index.css';



function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="degreelist" element={ <DegreeList/> } />
        <Route path="test" element={ <NavBar/> } />
        <Route path="cohortlist" element={ <CohortList/> } />
        <Route path="modulelist" element={ <ModuleList/> } />
        <Route path="singledegree" element={ <SingleDegree/> } />
        <Route path="singlecohort" element={ <SingleCohort/> } />
        <Route path="singlemodule" element={ <SingleModule /> } />
        <Route path="modulestocohort" element={ <ModuletoCohort /> } />
        <Route path="singlestudent" element={ <SingleStudent /> } />
        <Route path="formdegree" element={ <FormDegree /> } />
        <Route path="formcohort" element={ <FormCohort /> } />
        <Route path="formmodule" element={ <FormModule /> } />
        <Route path="formstudent" element={ <FormStudent /> } />
        <Route path="addgrade" element={ <AddGrade /> } />












        




      </Routes>
      </header>

    </div>
  );
}

export default App;
// https://www.freecodecamp.org/news/how-to-use-react-router-version-6/