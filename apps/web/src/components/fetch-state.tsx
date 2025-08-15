import { Bug, Cat, Snail } from "lucide-react";
import { Button } from "./ui/button";

interface FetchStateProps {
  retry?: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  isError?: string;
  sectionName?: string;
}

const FetchState = ({ retry, children, isLoading, isEmpty, isError, sectionName }: FetchStateProps) => {
  return (
    <>
      {isLoading ? (
        <div className="text-center h-96 flex flex-col justify-center items-center border rounded-lg p-4 gap-4">
          <Snail size={40} className="text-neutral-500 animate-bounce" />

          <div className="text-neutral-500">Any second now...</div>
        </div>
      ) : isError ? (
        <div className="text-center h-96 flex flex-col justify-center items-center border rounded-lg p-4 gap-4">
          <Bug size={40} className="mx-aut" />

          <h1 className="text-2xl font-bold ">Uh oh!</h1>

          <div className="text-muted-foreground">This one's on us, we'll fix it soon.</div>

          {retry && (
            <Button variant="outline" onClick={retry}>
              Retry
            </Button>
          )}
        </div>
      ) : isEmpty ? (
        <div className="text-center h-96 flex flex-col justify-center items-center border rounded-lg p-4 gap-4">
          <Cat size={40} className="mx-aut animate-bounce" />

          <h1 className="text-2xl font-bold text-neutral-500">Such empty space!</h1>

          {sectionName && (
            <div className="text-neutral-500">
              Make use of the space by adding new <span className="font-bold">{sectionName}</span>.
            </div>
          )}
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default FetchState;
