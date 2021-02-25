import logo from './logo.svg';
import './App.css';
import {BaseChart, BarChart} from './components/charts';
import { useEffect, useCallback } from 'react';
import { useSelector, useStore, useDispatch, connect } from 'react-redux';
import { getUserEvents } from  './user_events/selectors'
import { DATA_REQUESTED, SCRAMBLE_DATA } from './user_events/actions'
import * as eventActions from './user_events/actions'
import { bindActionCreators } from 'redux';
import { dispatch, svg } from 'd3';
import axios from 'axios';
import openSocket from 'socket.io-client';

function App(props) {
  const store = useStore()
  const userEvents = useSelector(store => getUserEvents(store))
  const  socket = openSocket('http://localhost:5000');

  useEffect( () => {
  
    let exists = document.querySelector("#chart>svg")
    if(exists){
      exists.remove();
    }
    BarChart({data: userEvents});
    socket.emit('connect')
    socket.on('chartdata', function(d){
      let data = JSON.parse(d);
      props.dataUpdated(data)
    })
  })

  const fetchData = () => {
    axios.post(`http://localhost:5000/api/data`, {})
    .then(res => {
      props.dataUpdated(res.data)
    })

  }

  const chartArea = ()=>{
    return (<div id="chart">
    </div>)
  }

  return (
    <div className="App">
      <header className="main">
      <div className="BarChart">
                <h1>Realtime charts!</h1>
                <p>
                  This app is an example of real time updating charts using D3, React+Redux+Axios, SocketIO and Flask.
                </p>
                <button onClick={fetchData}>Change Data</button>
                
                {chartArea()}
            </div>
      </header>
      
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({

    events: state.events

})

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  }
}
const connectToStore = connect(
  mapStateToProps,
  eventActions
)

const Charts = connectToStore(App)

export default Charts
