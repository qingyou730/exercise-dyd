import React, { useState } from "react";
import "./App.css";

/**
 * 已知有一个远程加法
 * @param a
 * @param b
 * @returns
 */
async function addRemote(a: number, b: number) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
  return a + b;
}

/**
 * 请实现本地的 add 方法，调用 addRemote，能最优的实现输入数字的加法。
 * @example
 * ```
 * add(5, 6).then(result => {
 *   console.log(result); // 11
 * });
 * add(1, 4, 3, 3, 5).then(result => {
 *   console.log(result); // 16
 * })
 * add(2, 3, 3, 3, 4, 1, 3, 3, 5).then(result => {
 *   console.log(result); // 27
 * })
 * ```
 */
async function add(...inputs: number[]) {
  // 你的实现
  async function innerAdd(...inputs: number[]) {
    let pre = 0,
      end = inputs.length - 1;
    let proArr = [];

    while (pre < end) {
      proArr.push(addRemote(inputs[pre], inputs[end]));
      pre++;
      end--;
    }
    if (pre === end) {
      proArr.push(Promise.resolve(inputs[pre]));
    }
    let res = await Promise.all(proArr);
    return res;
  }


  while (inputs.length > 1) {
    inputs = await innerAdd(...inputs);
  }
  return inputs[0];
}

function App() {
  const [inputVal, setInputVal] = useState<string>("");
  const [sum, setSum] = useState<number | null>(null);
  let addIng = false;

  const changeFun = async () => {
    if (addIng) return;
    const reg = /^(\d+,)*\d+$/;
    if (inputVal.length === 0 || reg.test(inputVal)) {
      addIng = true;
      let strArr: Array<string> = inputVal.split(",");
      let numArr: Array<number> = strArr.map((i) => Number(i));
      const res = await add(...numArr);
      addIng = false;
      setSum(res)
    } else {
      alert("请输入这样的格式： 如1,3,4,5,6");
    }
  };

  const addFun = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>请实现add 方法，当用户在输入框中输入多个数字(逗号隔开)后，</div>
        <div>点击相加按钮能显示最终结果</div>
      </header>
      <section className="App-content">
        <input
          type="text"
          placeholder="请输入要相加的数字（如1,3,4,5,6）"
          onChange={addFun}
        />
        <button onClick={changeFun}>相加</button>
      </section>
      <section className="App-result">
        <p>
          相加结果是：<span>{sum}</span>
        </p>
      </section>
    </div>
  );
}

export default App;
