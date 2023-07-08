// interface BasicOptionsModalProps {
//   title: string;
// }

export const BasicOptionsModalBody = () => {
  return (
    <>
      <form action="" className="flex flex-col gap-4">
        <label htmlFor="">
          Number of nodes
          <input
            type="number"
            name="nodes"
            id="nodes"
            className="text-slate-950"
            min={1}
          />
        </label>

        <label htmlFor="">
          Complexity
          <input
            type="range"
            name="complexity"
            id="complexity"
            min={0}
            max={10}
          />
        </label>
      </form>
    </>
  );
};
