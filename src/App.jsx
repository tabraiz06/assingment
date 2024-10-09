import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [priority, setpriority] = useState(["low", "medium", "high"]);
  const [mainTask, setMainTask] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editTask, setEditTask] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [dateFilterItem, setdateFilterItem] = useState([]);
  const [filterDate, setfilterDate] = useState('');
  
  
  
  const filterbydate=()=>{
  setdateFilterItem(mainTask.filter((ele) => ele.date === filterDate));
   console.log(dateFilterItem)

  }

  useEffect(()=>{
    filterbydate()
  },[filterDate])

  const [todo, setTodo] = useState({
    date: "",
    task: "",
    priority: "low",
  });

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setMainTask([...mainTask, todo]);
    console.log(todo)
  };
  const handleDelete=(i)=>{
    setMainTask(mainTask.filter((ele,index)=>index !== i))
  }

  const handleEdit=(i,ele)=>{
    setEditIndex(i)
    setEditTask(ele)
  }

const handleEditChange=(e)=>{
  setEditTask({...editTask, [e.target.name]:e.target.value})
}

const handleEditedTask=()=>{
  const edit=[...mainTask]
  edit[editIndex]=editTask
  setMainTask(edit)
  setEditIndex(-1)
}
const fltertask = (e) => {
  setPriorityFilter(e.target.value);
 
};
//  console.log(priorityFilter);
  return (
    <div className="main">
      <select
        name="sortPriority"
        id=""
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option value="">select</option>
        {priority.map((ele, i) => {
          return (
            <option value={ele} key={i}>
              {ele}
            </option>
          );
        })}
      </select>
      <select name="filterDate" onChange={(e) => setfilterDate(e.target.value)}>
        <option value="">select</option>
        {mainTask.map((ele, i) => {
          return (
            <option value={ele.date} key={i}>
              {ele.date}
            </option>
          );
        })}
      </select>

      <input type="date" name="date" onChange={handleChange} />
      <input type="text" name="task" onChange={handleChange} />
      <select name="priority" id="" onChange={handleChange}>
        {priority.map((ele, index) => {
          return (
            <option value={ele} key={index}>
              {ele}
            </option>
          );
        })}
      </select>
      <button onClick={handleSubmit}>add</button>
      <div className="taks">
        {mainTask
          .filter((ele) => {
            if (filterDate !== "") {
              console.log(dateFilterItem);
               return ele.date === filterDate
            } else {
              return ele;
            }
          })
          .filter((ele) => {
            if (priorityFilter !== "") {
              return ele.priority.includes(priorityFilter);
            } else {
              return ele;
            }
          })
          .map((ele, i) => {
            {console.log(ele)}
            return (
              <div>
                <span>{ele.date}</span>
                <br />
                <span>{ele.task}</span>
                <br />
                <span>{ele.priority}</span>
                <div className="flex">
                  <button onClick={() => handleEdit(i, ele)}>edit</button>
                  <button onClick={() => handleDelete(i)}>delete</button>
                </div>
              </div>
            );
          })}

        {editIndex !== -1 && (
          <>
            <input
              type="date"
              name="date"
              value={editTask.date}
              onChange={handleEditChange}
            />
            <input
              type="text"
              name="task"
              value={editTask.task}
              onChange={handleEditChange}
            />
            <select
              name="priority"
              id=""
              value={editTask.priority}
              onChange={handleEditChange}
            >
              {priority.map((ele, index) => {
                return (
                  <option value={ele} key={index}>
                    {ele}
                  </option>
                );
              })}
            </select>
            <button onClick={handleEditedTask}>Save</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
