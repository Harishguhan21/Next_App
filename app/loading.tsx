import Header from "./components/Header/Header";

export default function Loading() {
  return (
    <main>
      <Header />
      <div className=" py-3 px-36 flex flex-wrap justify-center mt-10 ">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div className="animate-pulse bg-slate-400  m-3 w-64 h-72 rounded overflow-hidden"></div>
        ))}
      </div>
      ;
    </main>
  );
}
