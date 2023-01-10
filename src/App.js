import React,{useState,useEffect} from "react"
import './App.css';
import axios from "axios"

function App() {
  const [apidata,setdata] =useState([])
  const [user, setUser] = useState({
    question: "",
    option_a: "",
    option_b:"",
    option_c:"",
    option_d:"",
    correct_option:""

})

const handleChange = e => {
    const { name, value } = e.target
    setUser({
        ...user,
        [name]:value
    })
}

const submit =()=>{
  const {question,option_a,option_b,option_c,option_d, correct_option}= user
  if(question && option_a && option_b && option_c && option_d && correct_option){
      axios.post("http://localhost:9002/formdata", user)
      .then( res => {
        alert(res.data.message)
      })
  } else {
      alert("invlid input")
  }
}

useEffect(() => {
  axios.get("http://localhost:9001/getform").then((response) => {
      console.log(response.data)
    setdata(response.data);
  });
}, [])


  return (
   
    <>
        <div className="container-fluid">
        <div className="row justify-content-center text-white p-3">
          <div className="col-md-12 text-center">
            <h2 className='text-center mb-4 text-success display-4'>Admin-Pannel</h2>
            <form>
              <h3 className='display-4 mb-3'><em>Question</em></h3>
              <input type="text" name="question" value={user.question} onChange={handleChange } id='Qinpt' /><br />

              <div className="row justify-content-center">
                <div className="col-md-4">
                  <h4 className='mt-4 text-muted'><em>Option_a </em></h4>
                  <input type="text" name="option_a" value={user.option_a} onChange={handleChange } placeholder="Option_a" className='Ansinpt mb-3' /><br />
                </div>
                <div className="col-md-4 mt-4">
                  <h4 className='text-muted'><em>Option_b </em></h4>
                  <input type="text" name="option_b" value={user.option_b} onChange={handleChange } placeholder="Option_b" className='Ansinpt mb-3' /><br />
                </div>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-4">
                  <h4 className='text-muted'><em>Option_c </em></h4>
                  <input type="text" name="option_c" value={user.option_c} onChange={handleChange } placeholder="Option_c" className='Ansinpt mb-3' /><br />
                </div>
                <div className="col-md-4">
                  <h4 className='text-muted'><em> Option_d </em></h4>
                  <input type="text" name="option_d" value={user.option_d} onChange={handleChange }    placeholder="Option_d" className='Ansinpt mb-3' /><br />
                </div>
              </div>




              <h4 className='mt-4 mb-3'><em>Correct_Option </em></h4>
              <input type="text" name="correct_option" value={user.correct_option} onChange={handleChange }     maxlength="8" placeholder="Corrct_Option" className='corrctOpt mb-3' list="browsers" id="browser"/><br />

              <datalist id="browsers">
                <option value="Option_a"/>
                  <option value="Option_b"/>
                    <option value="Option_c"/>
                      <option value="Option_d"/>
                        </datalist>
                        <button className='btn' id='submitBTN' onClick={submit}>Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
    </>
  );
}

export default App;
