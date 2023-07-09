// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LayoutOptionsModalBodyProps {}

export const LayoutOptionsModalBody: React.FC<
  LayoutOptionsModalBodyProps
> = () => {
  return (
    <form>
      <ul>
        <li>Random</li>
        <li>Concentric</li>
        <li>Circular</li>
        <li>Grid</li>
        <li>BFS</li>
        <li>COSE</li>
      </ul>

      <span>🙂</span>
    </form>
  );
};
