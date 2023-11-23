import React, { useMemo, useState } from "react";
import "./App.css";

/**
 * 实现一个 Table 组件满足以下功能，如图 table.jpeg 所示
 * - 把数据渲染成表格
 * - 支持列排序
 * - 支持多列排序
 */

/**
 * 使用如下数据进行测试
 */
const testData: {
  name: string;
  chinese: number;
  math: number;
  english: number;
}[] = [
  {
    name: "Jim",
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    name: "Tom",
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    name: "Han",
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    name: "Lilei",
    chinese: 88,
    math: 99,
    english: 89,
  },
];

type Key = "chinese" | "math" | "english" | string;

function MyTable({ source }: { source: typeof testData }) {
  const [sort, setSort] = useState<Record<Key, boolean | undefined>>({
    chinese: false,
    math: false,
    english: false,
  });
  const onSort = (key: Key) => {
    setSort({ ...sort, [key]: !sort[key] });
  };

  const getData = (source: any) => {
    let data = [...source];
    ["chinese", "math", "english"].forEach((key) => {
      if (sort[key] === undefined) return;
      data.sort((a: any, b: any) => {
        return sort[key] ? b[key] - a[key] : 0;
      });
    });
    return data;
  };

  const jsx = useMemo(() => {
    const data = getData(source);

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th
              className={sort["chinese"] ? "active" : "no-active"}
              onClick={() => onSort("chinese")}
            >
              Chinese
            </th>
            <th
              className={sort["math"] ? "active" : "no-active"}
              onClick={() => onSort("math")}
            >
              Math
            </th>
            <th
              className={sort["english"] ? "active" : "no-active"}
              onClick={() => onSort("english")}
            >
              English
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, index: number) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.chinese}</td>
              <td>{row.math}</td>
              <td>{row.english}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }, [sort]);
  return jsx;
}

function App() {
  return (
    <div className="App">
      <h1>Table 组件</h1>
      <div>使用 testData 数据在这里渲染实现的 Table 组件</div>

      <MyTable source={testData} />
    </div>
  );
}

export default App;
