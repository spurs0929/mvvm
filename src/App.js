import { useDOM, useReactive } from '../MVVM';

function App(){

  const state = useReactive({
    count: 0,
    name: '練習MVVM'
  })

  const add = (num) => {

    state.count += num;
  }

  const minus = (num) => {

    state.count -= num;
  }

  const changeName = (name) => {

    state.name = name;
  }

  return {
    template: `
      <h1>{{ count }}</h1>
      <h2>{{ name }}</h2>
      <button onClick="add(2)">+</button>
      <button onClick="minus(1)">-</button>
      <button onClick="changeName('MVVM')">Change Name</button>
    `,
    state,
    methods: {
      add,
      minus,
      changeName
    }
  }
}

// 將template掛載到DOM上
useDOM(
  App(),
  document.querySelector('#app')  
)