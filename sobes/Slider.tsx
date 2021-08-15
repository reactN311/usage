import React from 'react'
// import './styles.css'

const TIMEOUT = 1000
type TAction = 'next' | 'play' | 'stop' | 'prev'

interface ISlideProps {i: number}
interface IAction {type: TAction}
interface IState {idSlide: number, action: IAction}
interface ControlsProps {
  setSlid: (e: actionTypeMouseEv) => void
}


type actionTypeMouseEv = React.MouseEvent<HTMLButtonElement>
type TRootReduceProps = (state: IState, action: IAction) => IState
 
const initialState: IState = { idSlide: 0, action: {type: 'next'} }

const SLIDES = [
  'https://via.placeholder.com/300x100/FACE8D',
  'https://via.placeholder.com/300x100/DDAABB',
  'https://via.placeholder.com/300x100/CCFF00',
]



function creacteStore(rootReducer: TRootReduceProps, initialState: IState) {
  let state: IState = rootReducer(initialState, {type: 'stop'})
  const subscribers: Function[] = [] 
  
  return {
    dispatch(action: IAction) { 
      state = rootReducer(state, action)
      subscribers.forEach((f) => {
        f()
      }) 
    },
    subscribe(cb: Function) {
      subscribers.push(cb)
    },
    getState() {
      return state
    },
  }
}
 
function reduce(state: IState = initialState , action: IAction): IState {
  switch (action.type) {
    case 'prev': 
      let activeId = state.idSlide === 0 ? 2 : --state.idSlide
      return { idSlide: activeId, action: {type: 'prev'} }
    case 'next':
      let newId2 = state.idSlide === 2 ? 0 : ++state.idSlide
      return { idSlide: newId2, action: {type: 'next'} }
    case 'play':
      let IdPlay = state.idSlide === 2 ? 0 : ++state.idSlide
      return { idSlide: IdPlay, action: {type: 'play'} }
    case 'stop':
      return { ...state, action: {type: 'stop'} }
    default:
      return state
  }
}

const Controls = ({ setSlid }:ControlsProps) => {
  return (
    <div>
      <button id="prev" onClick={setSlid}>
        Prev
      </button>
      <button id="next" onClick={setSlid}>
        Next
      </button>
      <button id="play" onClick={setSlid}>
        Play
      </button>
      <button id="stop" onClick={setSlid}>
        Stop
      </button>
    </div>
  )
}

const Slide = ({ i }: ISlideProps) => <img src={SLIDES[i]} alt="" />

const store = creacteStore(reduce, initialState)
 
export function useSlide(intS: IState):[IState, (e: actionTypeMouseEv) => void] {
  const [stateS, setStateS] = React.useState(intS) 
  let refIvlId = React.useRef<any | undefined>(undefined)

  React.useEffect(() => {
    store.subscribe(() => { setStateS(store.getState()) })
    return function cleanup() {
      clearInterval(refIvlId.current)
    }
  }, [])

  let loopNextOrStop = (type: TAction) => {
    if ( type === 'play') {
      refIvlId.current = setInterval(() => store.dispatch({type: 'play'}), TIMEOUT)
    } else if ( type === 'stop') {
      store.dispatch({type: 'stop'})
      clearInterval(refIvlId.current)
    }
  }

  let setState = (e: actionTypeMouseEv) => {
    let id = (e.target as HTMLButtonElement).id as TAction
    store.dispatch({ type: id })
    
    if (id === 'next' || id === 'prev') { 
    } else {
      loopNextOrStop(id) 
    }
  } 
  return [stateS, setState]
}

export const Slider = () => {
  const [state, setState] = useSlide(initialState)
 
  return (
    <>
      <Slide i={state.idSlide} />
      <Controls setSlid={setState} /> 
    </>
  )
}

export default Slider
